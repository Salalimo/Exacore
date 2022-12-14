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
    public class GoodCatchPdf : IGoodCatchPdf
    {
        IExacoreContext _db;
        public GoodCatchPdf(IExacoreContext db)
        {
            _db = db;
        }
        public byte[] CreatePdf(int id)
        {
            var model = GetModel(id);
            var fileName = CreatePdf(model);
            return File.ReadAllBytes(fileName);
        }

        private string CreatePdf(GoodCatch model)
        {
            string pdfTemplate = @"c:\Temp\exacore\GoodCatch.pdf";
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
            string[] names, GoodCatch model)
        {
            for (int idx = 0; idx < names.Length; idx++)
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
                    chkField.Checked = idx % 4 == 0;
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

        private GoodCatch GetModel(int id)
        {
            var model = _db.GoodCatch
                .Include(g => g.Division)
                .Include(g => g.Department)
                .Include(g => g.Project)
                .Include(g => g.GoodCatchType)
                .Include(g => g.ControlMethod)
                .Where(g => g.GoodCatchId == id)
                .First();
            return model;
        }

        private string GetValue(GoodCatch model, string name)
        {
            var fn = new DocFieldNames();
            fn.SetGoodCatchFields();
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
