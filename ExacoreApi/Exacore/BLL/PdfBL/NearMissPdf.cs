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
    public class NearMissPdf : INearMissPdf
    {
        IExacoreContext _db;
        public NearMissPdf(IExacoreContext db)
        {
            _db = db;
        }

        public byte[] CreatePdf(int id)
        {
            var model = GetModel(id);
            var fileName = CreatePdf(model);
            return File.ReadAllBytes(fileName);
        }

        private string CreatePdf(NearMiss model)
        {
            string pdfTemplate = @"c:\Temp\exacore\NearMiss.pdf";
            string newFile = @"c:\Temp\new.pdf";

            PdfDocument document = PdfReader.Open(pdfTemplate, PdfDocumentOpenMode.Modify);
            PdfAcroForm form = document.AcroForm;
            PdfAcroField.PdfAcroFieldCollection fields = form.Fields;

            // Get all form fields of the whole document
            string[] names = fields.Names;
            names = fields.DescendantNames;
            LoopThrooughFields(fields, names, model);

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

        private void LoopThrooughFields(PdfAcroField.PdfAcroFieldCollection fields,
            string[] names, NearMiss model)
        {
            var list = names.ToList();
            list.Sort();

            for (int idx = 0; idx < list.Count; idx++)
            {
                string fqName = names[idx];
                PdfAcroField field = fields[fqName];

                PdfTextField txtField;
                PdfRadioButtonField radField;
                PdfCheckBoxField chkField;
                PdfListBoxField lbxField;
                PdfComboBoxField cbxField;
                PdfGenericField genField;

                string text = GetValue(model, fqName);
                //text = idx.ToString();

                if ((txtField = field as PdfTextField) != null)
                {
                    txtField.Value = new PdfString(text, PdfStringEncoding.Unicode);
                    txtField.ReadOnly = true;
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
            }
        }

        private NearMiss GetModel(int id)
        {
            var model = _db.NearMiss
                .Include(g => g.Division)
                .Include(g => g.Department)
                .Include(g => g.NearMissType)
                .Include(g => g.Project)
                .Include(g => g.ControlMethod)
                .Where(g => g.NearMissId == id)
                .First();
            return model;
        }

        private string GetValue(NearMiss model, string name)
        {
            var fn = new DocFieldNames();
            fn.SetNearMissFields();
            if (!fn.Fields.ContainsKey(name))
                return "";
            var propertyName = fn.Fields[name];
            PropertyInfo? property = model.GetType().GetProperty(propertyName);
            var value = property?.GetValue(model, null)?.ToString();
            return ApplyTransformation(value, propertyName);
        }
        private string ApplyTransformation(string value, string propertyName)
        {
            if (propertyName.Contains("Date"))
            {
                return value.Split(' ')[0];
            }
            else
            {
                return value;
            }
        }
    }
}
