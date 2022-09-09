using Exacore.BLL.PdfBL;
using PdfSharp.Pdf;
using PdfSharp.Pdf.AcroForms;
using PdfSharp.Pdf.IO;

namespace ConsoleAppCore
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string pdfTemplate = @"c:\Temp\exacore\JSa.pdf";
            PdfDocument document = PdfReader.Open(pdfTemplate, PdfDocumentOpenMode.Modify);
            PdfAcroForm form = document.AcroForm;
            PdfAcroField.PdfAcroFieldCollection fields = form.Fields;
            string[] names = fields.Names;
            foreach (string name in names)
            {
                Console.WriteLine(name);
            }
            for (int idx = 0; idx < fields.Count; idx++)
            {
                //Console.WriteLine(fields[idx].Name);
            }

            //return;
            //var pdf = new GoodCatchPdf();
            //var pdf = new IncidentAlertPdf();
            var pdf = new JsaPdf();
            //var pdf = new MotorizedEquipmentPdf();
            //var pdf = new NearMissPdf();
            //var pdf = new SiteSafetyOrientationPdf();
            //var pdf = new ToolboxMeetingPdf();
            pdf.CreatePdf();

        }
    }
}
