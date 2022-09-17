using Exacore.BLL.PdfBL.Interfaces;
using Exacore.DAL;
using Exacore.DAL.Forms;
using Microsoft.EntityFrameworkCore;
using PdfSharp.Pdf;
using PdfSharp.Pdf.AcroForms;
using PdfSharp.Pdf.IO;
using System.IO;
using System.Linq;
using System.Reflection;

namespace Exacore.BLL.PdfBL
{
    public class JsaPdf : IJsaPdf
    {
        IExacoreContext _db;
        public JsaPdf(IExacoreContext db)
        {
            _db = db;
        }

        public byte[] CreatePdf()
        {
            var model = GetModel();
            var fileName = CreatePdf(model);
            return File.ReadAllBytes(fileName);
        }

        private string CreatePdf(Jsa model)
        {
            string pdfTemplate = @"c:\Temp\exacore\JSA.pdf";
            string newFile = @"c:\Temp\new.pdf";

            PdfDocument document = PdfReader.Open(pdfTemplate, PdfDocumentOpenMode.Modify);
            PdfAcroForm form = document.AcroForm;
            PdfAcroField.PdfAcroFieldCollection fields = form.Fields;

            LoopThrooughFields(fields, model);
            LoopThrooughStepActions(fields, model);
            LoopThrooughCrewAttendances(fields, model);
            SetCheckBoxes(fields, model);

            SetReadOnly(fields);

            if (form.Elements.ContainsKey("/NeedAppearances"))
            {
                form.Elements["/NeedAppearances"] = new PdfSharp.Pdf.PdfBoolean(true);
            }
            else
            {
                form.Elements.Add("/NeedAppearances", new PdfSharp.Pdf.PdfBoolean(true));
            }
            document.Save(newFile);
            return newFile;
        }
        private void SetReadOnly(PdfAcroField.PdfAcroFieldCollection fields)
        {
            for (int idx = 0; idx < fields.Count; idx++)
            {
                fields[idx].ReadOnly = true;
            }
        }

        private void LoopThrooughFields(PdfAcroField.PdfAcroFieldCollection fields, Jsa model)
        {
            for (int idx = 0; idx < fields.Count; idx++)
            {
                var fqName = fields[idx].Name;
                //string fqName = names[idx];
                PdfAcroField field = fields[idx];
                PdfTextField txtField;
                PdfRadioButtonField radField;
                PdfCheckBoxField chkField;
                PdfListBoxField lbxField;
                PdfComboBoxField cbxField;
                PdfGenericField genField;

                string text = GetValue(model, fqName);
                //text = fqName;
                //text = idx.ToString();

                field.Value = new PdfString(text, PdfStringEncoding.Unicode);

                if ((txtField = field as PdfTextField) != null)
                {
                    txtField.Value = new PdfString(text, PdfStringEncoding.Unicode);
                }
                else if ((radField = field as PdfRadioButtonField) != null)
                {
                    radField.SelectedIndex = 0;
                }
                else if ((chkField = field as PdfCheckBoxField) != null)
                {
                    chkField.Checked = text == "True";
                }
                else if ((lbxField = field as PdfListBoxField) != null)
                {
                    lbxField.SelectedIndex = 0;
                }
                else if ((cbxField = field as PdfComboBoxField) != null)
                {
                    cbxField.SelectedIndex = 0;
                }
                else if ((genField = field as PdfGenericField) != null)
                {
                }
                //field.ReadOnly = true;
            }
        }

        private Jsa GetModel()
        {
            var model = _db.Jsa
                .Include(g => g.StepActions)
                .Include(g => g.CrewAttendances)
                .First();
            return model;
        }

        private string GetValue(Jsa model, string name)
        {
            var fn = new DocFieldNames();
            fn.SetJsaFields();
            if (!fn.Fields.ContainsKey(name))
            {
                return "";
            }
            var propertyName = fn.Fields[name];
            PropertyInfo? property = model.GetType().GetProperty(propertyName);
            var ret = property?.GetValue(model, null)?.ToString();
            return ret;
        }
        private void LoopThrooughStepActions(PdfAcroField.PdfAcroFieldCollection fields, Jsa model)
        {
            var fn = new DocFieldNames();
            fn.SetJsaFields();

            int i = 0;
            foreach (var stepAction in model.StepActions)
            {
                var ids = fn.JsaStepActions[++i];

                PdfAcroField field = fields["Text Field " + ids.Split(',')[0]];
                PdfTextField txtField = field as PdfTextField;
                txtField.Value = new PdfString(stepAction.StepSequnce, PdfStringEncoding.Unicode);

                field = fields["Text Field " + ids.Split(',')[1]];
                txtField = field as PdfTextField;
                txtField.Value = new PdfString(stepAction.Hazards, PdfStringEncoding.Unicode);

                field = fields["Text Field " + ids.Split(',')[2]];
                txtField = field as PdfTextField;
                txtField.Value = new PdfString(stepAction.Actions, PdfStringEncoding.Unicode);
            }
        }

        private void LoopThrooughCrewAttendances(PdfAcroField.PdfAcroFieldCollection fields, Jsa model)
        {
            var fn = new DocFieldNames();
            fn.SetJsaFields();

            int i = 0;
            foreach (var stepAction in model.CrewAttendances)
            {
                var ids = fn.JsaCrewAttendance[++i];

                PdfAcroField field = fields["Text Field " + ids.Split(',')[0]];
                PdfTextField txtField = field as PdfTextField;
                txtField.Value = new PdfString(stepAction.PrintName, PdfStringEncoding.Unicode);

                field = fields["Text Field " + ids.Split(',')[1]];
                txtField = field as PdfTextField;
                txtField.Value = new PdfString(stepAction.SignName, PdfStringEncoding.Unicode);
            }
        }

        private void SetCheckBoxes(PdfAcroField.PdfAcroFieldCollection fields, Jsa model)
        {
            int i = 3;
            if(!model.DailySafety.Value)
                i = 4;
            PdfAcroField field = fields["Check Box " + i];
            PdfCheckBoxField checkBoxField = field as PdfCheckBoxField;
            checkBoxField.Checked = true;
        }
    }
}
