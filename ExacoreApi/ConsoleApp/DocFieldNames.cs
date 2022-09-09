using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    public class DocFieldNames
    {
        public Dictionary<string, string> Fields { get; set; } = new Dictionary<string, string>();
        public DocFieldNames()
        {
            SetGoodCatchName();
        }

        private void SetGoodCatchName()
        {
            Fields.Add("GOOD CATCH DATE", "Date");
            Fields.Add("GOOD CATCH TIME" , "Time");
            Fields.Add("DIVISION" , "Division");
            Fields.Add("DEPARTMENT" , "Department");
            Fields.Add("AFFECTED JOBSITE LOCATION" , "AffectedJobsiteLocation");
            Fields.Add("PROJECT NAME" , "Project");
            Fields.Add("GOOD CATCH TYPE" , "GoodCatchType");
            Fields.Add("SUPERVISOR" , "Supervisor");
            Fields.Add("NAME  TITLE OF  GOOD CATCH IDENTIFIER" , "");
            Fields.Add("GOOD CATCH DESCRIPTION" , "Description");
            Fields.Add("CONTROL METHOD" , "ControlMethod");
            Fields.Add("IMMEDIATE ACTION TAKEN" , "ImmediateActionTaken");
            Fields.Add("DATE" , "DateTime");
            Fields.Add("PREPARED BY" , "ChangeBy");
            //undefined

        }
    }
}
