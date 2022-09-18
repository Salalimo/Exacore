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
    public class MotorizedEquipmentPdf : IMotorizedEquipmentPdf
    {
        IExacoreContext _db;
        public MotorizedEquipmentPdf(IExacoreContext db)
        {
            _db = db;
        }

        public byte[] CreatePdf(int id)
        {
            var model = GetModel(id);
            var fileName = CreatePdf(model);
            return File.ReadAllBytes(fileName);
        }

        private string CreatePdf(MotorizedEquipment model)
        {
            string pdfTemplate = @"c:\Temp\exacore\MotorizedEquipment.pdf";
            string newFile = @"c:\Temp\new.pdf";

            PdfDocument document = PdfReader.Open(pdfTemplate, PdfDocumentOpenMode.Modify);
            PdfAcroForm form = document.AcroForm;
            PdfAcroField.PdfAcroFieldCollection fields = form.Fields;

            // Get all form fields of the whole document
            string[] names = fields.Names;
            names = fields.DescendantNames;
            LoopThrooughFields(fields, names, model);
            LoopThrooughTextBoxes(fields, model);

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
            string[] names, MotorizedEquipment model)
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
                text = idx.ToString();

                if ((txtField = field as PdfTextField) != null)
                {
                    txtField.Value = new PdfString(text, PdfStringEncoding.Unicode);
                    txtField.Value = new PdfString(fqName, PdfStringEncoding.Unicode);
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

        private MotorizedEquipment GetModel(int Id)
        {
            var model = _db.MotorizedEquipment
               .Include(t => t.OperationalInspection.Headlights)
               .Include(t => t.OperationalInspection.ReverseLights)
               .Include(t => t.OperationalInspection.ReverseLights)
               .Include(t => t.OperationalInspection.RunningLights)
               .Include(t => t.OperationalInspection.ParkingBrake)
               .Include(t => t.OperationalInspection.BatteryGauge)
               .Include(t => t.OperationalInspection.WaterLevelGauge)
               .Include(t => t.OperationalInspection.TemperatureGauge)
               .Include(t => t.OperationalInspection.OilLevelGauge)
               .Include(t => t.OperationalInspection.FuelLevelGauge)
               .Include(t => t.OperationalInspection.Horn)
               .Include(t => t.OperationalInspection.ReverseSignal)
               .Include(t => t.OperationalInspection.Brakes)
               .Include(t => t.OperationalInspection.SeatBelt)
               .Include(t => t.OperationalInspection.Chains)
               .Include(t => t.OperationalInspection.HydraulicOutriggers)
               .Include(t => t.OperationalInspection.HydraulicTilt)
               .Include(t => t.OperationalInspection.HydraulicSideShift)
               .Include(t => t.OperationalInspection.EngineOilLevel)
               .Include(t => t.OperationalInspection.HydraulicOilLevel)
               .Include(t => t.OperationalInspection.SteeringControls)
               .Include(t => t.DamageInspection.LeaksDetected)
               .Include(t => t.DamageInspection.TiresAndWheels)
               .Include(t => t.DamageInspection.Forks)
               .Include(t => t.DamageInspection.Attachments)
               .Include(t => t.DamageInspection.BatteryConnectors)
               .Include(t => t.DamageInspection.Guards)
               .Include(t => t.DamageInspection.SafetyDevices)
               .Include(t => t.DamageInspection.PropaneTankLines)
               .Where(t => t.MotorizedEquipmentId == Id)
               .First();
            return model;
        }

        private void LoopThrooughTextBoxes(PdfAcroField.PdfAcroFieldCollection fields, MotorizedEquipment model)
        {
            for (int i = 1; i <= 34; i++)
            {
                if (i < 5)
                {
                    var text = GetValue(model, "Text Field " + i);
                    PdfAcroField field = fields["Text Field " + i];
                    PdfTextField txtField = field as PdfTextField;
                    txtField.ReadOnly = false;
                    txtField.Value = new PdfString(text, PdfStringEncoding.Unicode);
                    txtField.ReadOnly = true;
                }
                else if (i < 26)
                {
                    var text = GetOperationalValue(model.OperationalInspection, "Text Field " + i);
                    PdfAcroField field = fields["Text Field " + i];
                    PdfTextField txtField = field as PdfTextField;
                    txtField.ReadOnly = false;
                    txtField.Value = new PdfString(text, PdfStringEncoding.Unicode);
                    txtField.ReadOnly = true;
                }
                else
                {
                    var text = GetDamageValue(model.DamageInspection, "Text Field " + i);
                    PdfAcroField field = fields["Text Field " + i];
                    PdfTextField txtField = field as PdfTextField;
                    txtField.ReadOnly = false;
                    txtField.Value = new PdfString(text, PdfStringEncoding.Unicode);
                    txtField.ReadOnly = true;
                }
            }
        }

        private string GetValue(MotorizedEquipment model, string name)
        {
            var fn = new DocFieldNames();
            fn.SetMotorizedEquipment();
            if (!fn.Fields.ContainsKey(name))
                return "";
            var propertyName = fn.Fields[name];
            PropertyInfo? property = model.GetType().GetProperty(propertyName);
            var ret = property?.GetValue(model, null)?.ToString();
            return ret;
        }

        private string GetOperationalValue(MotorizedEquipmentOperationalInspection model, string name)
        {
            var fn = new DocFieldNames();
            fn.SetMotorizedEquipment();
            if (!fn.Fields.ContainsKey(name))
                return "";
            var propertyName = fn.Fields[name];
            propertyName = propertyName.Replace("OperationalInspection.", "");
            PropertyInfo? property = model.GetType().GetProperty(propertyName);
            var ret = property?.GetValue(model, null)?.ToString();
            return ret;
        }

        private string GetDamageValue(MotorizedEquipmentDamageInspection model, string name)
        {
            var fn = new DocFieldNames();
            fn.SetMotorizedEquipment();
            if (!fn.Fields.ContainsKey(name))
                return "";
            var propertyName = fn.Fields[name];
            propertyName = propertyName.Replace("DamageInspection.", "");
            PropertyInfo? property = model.GetType().GetProperty(propertyName);
            var ret = property?.GetValue(model, null)?.ToString();
            return ret;
        }
    }
}
