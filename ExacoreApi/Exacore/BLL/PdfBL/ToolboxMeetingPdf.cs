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
    public class ToolboxMeetingPdf
    {
        public byte[] CreatePdf()
        {
            var model = GetModel();
            var fileName = CreatePdf(model);
            return File.ReadAllBytes(fileName);
        }

        private string CreatePdf(ToolboxMeeting model)
        {
            string pdfTemplate = @"c:\Temp\exacore\ToolboxMeeting.pdf";
            string newFile = @"c:\Temp\new.pdf";

            PdfDocument document = PdfReader.Open(pdfTemplate, PdfDocumentOpenMode.Modify);
            PdfAcroForm form = document.AcroForm;
            PdfAcroField.PdfAcroFieldCollection fields = form.Fields;

            // Get all form fields of the whole document
            string[] names = fields.Names;
            names = fields.DescendantNames;
            LoopThrooughFields(fields, names, model);
            LoopThrooughTopics(fields, names, model);
            LoopThrooughAttendances(fields, names, model);
            LoopThrooughFields(fields, names);

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
            string[] names)
        {
            var list = names.ToList();

            for (int idx = 0; idx < list.Count; idx++)
            {
                string fqName = names[idx];
                PdfAcroField field = fields[fqName];
                field.ReadOnly = true;
                //PdfTextField txtField;
                //PdfRadioButtonField radField;
                //PdfCheckBoxField chkField;
                //PdfListBoxField lbxField;
                //PdfComboBoxField cbxField;
                //PdfGenericField genField;

                //if ((txtField = field as PdfTextField) != null)
                //    txtField.ReadOnly = true;
                //else if ((radField = field as PdfRadioButtonField) != null)
                //    radField.ReadOnly = true;
                //else if ((chkField = field as PdfCheckBoxField) != null)
                //    chkField.ReadOnly = true;
                //else if ((lbxField = field as PdfListBoxField) != null)
                //    lbxField.ReadOnly = true;
                //else if ((cbxField = field as PdfComboBoxField) != null)
                //    cbxField.ReadOnly = true;
                //else if ((genField = field as PdfGenericField) != null)
                //    genField.ReadOnly = true;
            }
        }

        private void LoopThrooughFields(PdfAcroField.PdfAcroFieldCollection fields,
            string[] names, ToolboxMeeting model)
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
                    txtField.Value = new PdfString(text, PdfStringEncoding.Unicode);
                else if ((radField = field as PdfRadioButtonField) != null)
                    radField.SelectedIndex = 0;
                else if ((chkField = field as PdfCheckBoxField) != null)
                    chkField.Checked = text == "True";
                else if ((lbxField = field as PdfListBoxField) != null)
                    lbxField.SelectedIndex = 0;
                else if ((cbxField = field as PdfComboBoxField) != null)
                    cbxField.SelectedIndex = 0;
                else if ((genField = field as PdfGenericField) != null)
                {
                }
            }
        }

        private ToolboxMeeting GetModel()
        {
            var connectionstring = "Server=ROGU3\\SQLEXPRESS; Database=Exacore; User Id=ssaa;Password=limo;";
            var optionsBuilder = new DbContextOptionsBuilder<ExacoreContext>();
            optionsBuilder.UseSqlServer(connectionstring);
            var db = new ExacoreContext(optionsBuilder.Options);
            var model = db.ToolboxMeeting
                .Include(t => t.Project)
                .Include(t => t.Topics)
                .Include(t => t.Attendances)
                .First();
            return model;
        }

        private string GetValue(ToolboxMeeting model, string name)
        {
            var fn = new DocFieldNames();
            fn.SetToolboxMeetingFields();
            if (!fn.Fields.ContainsKey(name))
                return "";
            var propertyName = fn.Fields[name];
            PropertyInfo? property = model.GetType().GetProperty(propertyName);
            var ret = property?.GetValue(model, null)?.ToString();
            return ret;
        }


        private void LoopThrooughTopics(PdfAcroField.PdfAcroFieldCollection fields,
            string[] names, ToolboxMeeting model)
        {
            int i = 0;
            foreach (var topic in model.Topics)
            {
                PdfAcroField field = fields["TOPICS COVERED LISTBRIEF DESCRIPTIONRow" + ++i];
                PdfTextField txtField = field as PdfTextField;
                txtField.Value = new PdfString(topic.Description, PdfStringEncoding.Unicode);
            }
        }

        private void LoopThrooughAttendances(PdfAcroField.PdfAcroFieldCollection fields,
         string[] names, ToolboxMeeting model)
        {
            int i = 0;
            foreach (var attendance in model.Attendances)
            {
                ++i;
                PdfAcroField nameField = fields["NAME SIGNATURERow" + i];
                PdfTextField nameTextbox = nameField as PdfTextField;
                nameTextbox.Value = new PdfString(attendance.Name, PdfStringEncoding.Unicode);

                PdfAcroField companyField = fields["COMPANYRow" + i];
                PdfTextField companyTextbox = companyField as PdfTextField;
                companyTextbox.Value = new PdfString(attendance.Company, PdfStringEncoding.Unicode);

                PdfAcroField commentsField = fields["COMMENTSSAFETY CONCERNS TRAINING REQUESTSRow" + i];
                PdfTextField commentsTextbox = commentsField as PdfTextField;
                commentsTextbox.Value = new PdfString(attendance.Comments, PdfStringEncoding.Unicode);
            }
        }
    }
}
