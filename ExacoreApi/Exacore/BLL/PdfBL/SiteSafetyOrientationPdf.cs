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
    public class SiteSafetyOrientationPdf
    {
        public byte[] CreatePdf()
        {
            var model = GetModel();
            var fileName = CreatePdf(model);
            return File.ReadAllBytes(fileName);
        }

        private string CreatePdf(SiteSafetyOrientation model)
        {
            string pdfTemplate = @"c:\Temp\exacore\SiteSafetyOrientation.pdf";
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
            string[] names, SiteSafetyOrientation model)
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
                //text = fqName;

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

        private SiteSafetyOrientation GetModel()
        {
            var connectionstring = "Server=ROGU3\\SQLEXPRESS; Database=Exacore; User Id=ssaa;Password=limo;";
            var optionsBuilder = new DbContextOptionsBuilder<ExacoreContext>();
            optionsBuilder.UseSqlServer(connectionstring);
            var db = new ExacoreContext(optionsBuilder.Options);
            var model = db.SiteSafetyOrientation
                .Include(s => s.Project)
                .First();
            return model;
        }

        private string GetValue(SiteSafetyOrientation model, string name)
        {
            //if (name.Contains("."))
            //{
            //    string propertyName = name.Split(',')[0];
            //    PropertyInfo? property = model.GetType().GetProperty(propertyName);
            //    var refType = property?.ReflectedType;
            //    var valu = property.GetValue(model, null);

            //    var one = refType.GetProperties()[0];
            //    var ppp1 = refType.GetProperty("Division").ReflectedType.GetProperty("Name");
            //    var typess = ppp1.PropertyType;
            //    var ppp2 = ppp1.ReflectedType;
            //    //var val = ppp1.GetValue();
            //    return "".ToString();
            //}
            var fn = new DocFieldNames();
            fn.SetSiteSafetyOrientationFields();
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
