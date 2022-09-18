namespace Exacore.BLL.PdfBL.Interfaces
{
    public interface IIncidentAlertPdf
    {
        byte[] CreatePdf(int formId);
    }
}
