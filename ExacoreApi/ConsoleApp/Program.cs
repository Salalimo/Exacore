using Exacore.DAL;
using Exacore.DAL.Forms;
using PdfSharp.Pdf;
using PdfSharp.Pdf.AcroForms;
using PdfSharp.Pdf.IO;
using System;
using System.Linq;
using System.Reflection;

namespace ConsoleApp
{
    internal class Program
    {
        static void Main(string[] args)
        {

            CreateGoodCatch();
            //if (form.Elements.ContainsKey("/NeedAppearances"))
            //{
            //    form.Elements["/NeedAppearances"] = new PdfSharp.Pdf.PdfBoolean(true);
            //}
            //else
            //{
            //    form.Elements.Add("/NeedAppearances", new PdfSharp.Pdf.PdfBoolean(true));
            //}

            // Fill some value in each field



        }

        private static void CreateGoodCatch()
        {
            var model = GetGoodCatchModel();
            CreateGoodCatchPdf(model);
        }

        private static void CreateGoodCatchPdf(GoodCatch model)
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
        }

        private static void LoopThrooughFields(PdfAcroField.PdfAcroFieldCollection fields, 
            string[] names, GoodCatch model)
        {
            for (int idx = 0; idx < names.Length; idx++)
            {
                string fqName = names[idx];
                Console.WriteLine(fqName);
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
                    //Console.WriteLine(String.Format("text field '{0}': '{1}'    {2} ", 
                    //    txtField.Name, txtField.Text, txtField.Value));
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

        private static GoodCatch GetGoodCatchModel()
        {
            var db = new ExacoreContext();
            var model = db.GoodCatch.First();
            return model;
        }

        private static string GetValue(GoodCatch model, string name)
        {
            var fn = new DocFieldNames();
            var propertyName = fn.Fields[name];
            PropertyInfo property = model.GetType().GetProperty(propertyName);
            return property.GetValue(model, null).ToString();
        }
    }
}
