import React from "react";
import ReactDOM from "react-dom";
import {Table, Column, Cell} from 'fixed-data-table';



var DepartmentGridTable = React.createClass({
 getInitialState: function() {
    return {
      departments: [
          {
            "ABBREVIATION" : ".letdexa",
            "UPDATED" : "",
            "CONTENTS" : "This letter is to notify you of the results of your recent bone density test (DEXA scan).\n\n_. Your bone density was normal. Please continue to take calcium 1500 mg daily along with a multiple vitamin that contains Vitamin D (400 international unit) to keep your bones strong. Repeat testing is generally recommended in 2-3 years, please discuss with your health care provider at your annual exam next year. \n\n_ Your bone density test showed mild bone loss, also known as mild osteopenia. While this is in the early stages, there are things you can do to help prevent further bone loss. Continue to take calcium 1500 mg daily and a multiple vitamin that contains Vitamin D (400 international unit). Weight-bearing exercise is also an excellent way to build bone.Stopping smoking and decreasing alcohol use is also helpful. You will want to discuss with your health care provider followup testing, but likely it will be recommended in 2-3 years.\n\n_ Your bone density test showed more severe osteopenia (osteopenia is a lesser degree of bone loss than osteoporosis). It does not meet our criteria for osteoporosis, but definitely is a cause for concern. All of the above information applies to you as well, for prevention of further loss. In addition, if you would like to consider a prescription medication to help prevent further bone loss, please contact your health care provider for an appointment to review your options. Otherwise, routine follow-up in 1-2 years with retesting at that time is recommended.\n\n_ Your bone density test showed osteoporosis. Please call _ to set up an appointment to discuss this.\n\nIf you have any questions, please do not hesitate to contact your health care provider at _.\n\nThank you.\n\n\n"
          },
          {
            "ABBREVIATION" : ".letdexa_Nl",
            "UPDATED" : "",
            "CONTENTS" : "Normal: Your bone density scan (DEXA) showed normal bone density. Here are some things experts recommend to help keep your bones strong:\n- Calcium, 1000-1200mg per day, mostly from healthy foods, rather than supplements. Good sources of calcium include: dairy, tofu, canned salmon and sardines, kale, Chinese cabbage, and calcium-fortified juices (http://ods.od.nih.gov/factsheets/Calcium-QuickFacts/).\n- Vitamin D3, 600-800 I.U. per day, typically from supplements. \n- Regular weight-bearing exercise (such as walking, jogging, dancing).\n- If you currently smoke, stop (smoking weakens your bones).\n- Limit your alcohol use to no more than 1-2 drinks per day on average.\nFortunately, bone density changes very slowly, so we wont need to repeat your DEXA scan for another 10-15 years.\n\n"
          },
          {
            "ABBREVIATION" : ".letdexa_osteo",
            "UPDATED" : "",
            "CONTENTS" : "Advanced Osteopenia: Your bone density scan (DEXA) showed decreased bone density (osteopenia). Fortunately, you do NOT have osteoporosis. Here are some things experts recommend to help prevent osteoporosis:\n- Calcium, 1000-1200mg per day, mostly from healthy foods, rather than supplements. Good sources of calcium include: dairy, tofu, canned salmon and sardines, kale, Chinese cabbage, and calcium-fortified juices (http://ods.od.nih.gov/factsheets/Calcium-QuickFacts/).\n- Vitamin D3, 600-800 I.U. per day, typically from supplements. \n- Regular weight-bearing exercise (such as walking, jogging, dancing).\n- If you currently smoke, stop (smoking weakens your bones).\n- Limit your alcohol use to no more than 1-2 drinks per day on average.\nWe can discuss this more at your next visit but I will probably recommend a repeat DEXA scan in 2 years.\n\n"
          },
          {
            "ABBREVIATION" : ".letdexa_osteo",
            "UPDATED" : "",
            "CONTENTS" : "Osteopenia (-1.0 to -2.4) but (+) FRAX score indicating osteoporosis treatment: Your bone density test showed that your risk for fractures (broken bones) is high enough to recommend treatment. Please call the number below to set up an appointment to discuss this in more detail and to review management options.\n\n\n"
          },
          {
            "ABBREVIATION" : ".letdexa_osteo",
            "UPDATED" : "",
            "CONTENTS" : "******Mild Osteopenia: Your bone density scan (DEXA) showed slightly decreased bone density (osteopenia). Fortunately, it is very mild, and you do NOT have osteoporosis. Here are some things experts recommend to help keep your bones strong:\n- Calcium, 1000-1200mg per day, mostly from healthy foods, rather than supplements. Good sources of calcium include: dairy, tofu, canned salmon and sardines, kale, Chinese cabbage, and calcium-fortified juices (http://ods.od.nih.gov/factsheets/Calcium-QuickFacts/).\n- Vitamin D3, 600-800 I.U. per day, typically from supplements. \n- Regular weight-bearing exercise (such as walking, jogging, dancing).\n- If you currently smoke, stop (smoking weakens your bones).\n- Limit your alcohol use to no more than 1-2 drinks per day on average.\nLets reassess your fracture risk in 2-3 years, either by MyVirginiaMason or during an office visit, and plan for another DEXA scan sometime in the next 5 years, depending on your risk.\n \n\n"
          },
          {
            "ABBREVIATION" : ".letdexa_osteo",
            "UPDATED" : "",
            "CONTENTS" : "Moderate Osteopenia: Your bone density scan (DEXA) showed mildly decreased bone density (osteopenia). Fortunately, it is not severe, and you do NOT have osteoporosis. Here are some things experts recommend to help keep your bones strong:\n- Calcium, 1000-1200mg per day, mostly from healthy foods, rather than supplements. Good sources of calcium include: dairy, tofu, canned salmon and sardines, kale, Chinese cabbage, and calcium-fortified juices (http://ods.od.nih.gov/factsheets/Calcium-QuickFacts/).\n- Vitamin D3, 600-800 I.U. per day, typically from supplements. \n- Regular weight-bearing exercise (such as walking, jogging, dancing).\n- If you currently smoke, stop (smoking weakens your bones).\n- Limit your alcohol use to no more than 1-2 drinks per day on average.\nLets reassess your fracture risk in 2-3 years, either by MyVirginiaMason or during an office visit, and plan for another DEXA scan sometime in the next 3-5 years, depending on your risk.\n\n"
          },
          {
            "ABBREVIATION" : ".letdexa_osteo",
            "UPDATED" : "",
            "CONTENTS" : "Osteoporosis: Your bone density test showed osteoporosis. Please call the number below to set up an appointment to discuss this diagnosis in more detail and to review management options.\n\n"
          },
          {
            "ABBREVIATION" : ".letdexa_osteo",
            "UPDATED" : "",
            "CONTENTS" : "Osteoporosis improving: Your bone density test showed osteoporosis, with some improvement since the last study.\n"
          },
          {
            "ABBREVIATION" : ".letdexa_osteo",
            "UPDATED" : "",
            "CONTENTS" : "******(Osteoporosis but (-) FRAX score indicating no treatment: Your bone density scan (DEXA) showed osteoporosis. Fortunately, your risk for a fracture (broken bone) is still fairly low. Here are some things experts recommend to help keep your bones strong:\n- Calcium, 1000-1200mg per day, mostly from healthy foods, rather than supplements. Good sources of calcium include: dairy, tofu, canned salmon and sardines, kale, Chinese cabbage, and calcium-fortified juices (http://ods.od.nih.gov/factsheets/Calcium-QuickFacts/).\n- Vitamin D3, 600-800 I.U. per day, typically from supplements. \n- Regular weight-bearing exercise (such as walking, jogging, dancing).\n- If you currently smoke, stop (smoking weakens your bones).\n- Limit your alcohol use to no more than 1-2 drinks per day on average.\nWe can discuss this more at your next visit but I will probably recommend a repeat DEXA scan in 2 years.) \n\n"
          },
          {
            "ABBREVIATION" : ".letdexa_osteo",
            "UPDATED" : "",
            "CONTENTS" : "Osteoporosis worsening: Your bone density test showed osteoporosis, with some decreased bone density since the last study.\n\n"
          },
          {
            "ABBREVIATION" : ".letGI_EDG_bx_",
            "UPDATED" : "",
            "CONTENTS" : "Biopsies during your recent upper endoscopy showed _.\n\nIf you have any questions, please call us at 206-223-2319.\n"
          },
          {
            "ABBREVIATION" : ".letGI_EDG_bx_",
            "UPDATED" : "",
            "CONTENTS" : "Biopsies during your recent upper endoscopy were normal.\n\nIf you have any questions, please call us at 206-223-2319.\n"
          },
          {
            "ABBREVIATION" : ".letGI_polyp",
            "UPDATED" : "",
            "CONTENTS" : "This is a report on your recent colonoscopy and polyp biopsy. _ \n\nYour next colonoscopy should be in _ years. If you have any questions, please call us at 206-223-2319.\n"
          },
          {
            "ABBREVIATION" : ".letGI_polyp_a",
            "UPDATED" : "",
            "CONTENTS" : "During your recent colonoscopy, you had an \"adenomatous polyp\" completely removed. Adenomatous polyps are benign but have the potential to turn into cancer, if not removed. Even though your polyp was completely removed, persons with this kind of polyp have a tendency to form new polyps over time. \n\nBased on this, your next colonoscopy should be in _ years. If you have any questions, please call us at 206-223-2319. \n"
          },
          {
            "ABBREVIATION" : ".letGI_polyp_a",
            "UPDATED" : "",
            "CONTENTS" : "During your recent colonoscopy, you had both a \"hyperplastic polyp\" and an \"adenomatous polyp\" completely removed. Hyperplastic polyps are completely benign and do not have the potential to develop in to cancer. Adenomatous polyps are benign but have the potential to turn into cancer, if not removed. Even though your polyp was completely removed, persons with this kind of polyp have a tendency to form new polyps over time. \n\nBased on this, your next colonoscopy should be in _ years. If you have any questions, please call us at 206-223-2319.\n"
          },
          {
            "ABBREVIATION" : ".letGI_polyp_h",
            "UPDATED" : "",
            "CONTENTS" : "During your recent colonoscopy, you had a \"hyperplastic polyp,\" completely removed. Hyperplastic polyps are completely benign and do not have the potential to develop in to cancer. \n\nYour next colonoscopy should be in _ years. If you have any questions, please call us at 206-223-2319.\n"
          },
          {
            "ABBREVIATION" : ".letpapascus-h",
            "UPDATED" : "",
            "CONTENTS" : "Your recent pap smear revealed the presence of mildly atypical cells (ASCUS). We had your cells checked further to determine whether you have a high risk strain of HPV (human papilloma virus), and I'm pleased to see the test for HPV was normal. This is reassuring, and essentially means that your risk of having precancerous cells is the same as if your pap smear had been completely normal. \n\nI recommend a routine follow-up pap smear one year from now.\n\nIf you have any further questions or concerns, please give our office a call or go to http://www.thehpvtest.com\n\n\n"
          },
          {
            "ABBREVIATION" : ".letpapascus-h",
            "UPDATED" : "",
            "CONTENTS" : "Your recent pap smear showed mildly atypical cells, and the test for HPV (Human Papilloma Virus) was positive.\n\nAtypical cells generally reflect reaction or inflammation, and in your case, reaction to the virus. Atypical cells are not necessarily pre-cancerous, and most women will go into remission from the HPV infection. However, we do want follow this closely.\n \nAt this time, we need to do a colposcopy to look more closely at your cervix. A colposcope is an instrument allowing the health care provider to visualize the cervix with a magnified lens and take a small biopsy of any abnormal areas.\n\nIf we have not already done so, our staff will be contacting you to schedule this procedure with one of the health care providers that performs colposcopy.\n\nIf you have any further questions or concerns, please give our office a call or go to http://www.thehpvtest.com\n\n\n"
          },
          {
            "ABBREVIATION" : ".letpapascus-u",
            "UPDATED" : "",
            "CONTENTS" : "Your recent pap smear revealed the presence of mildly atypical cells (ASCUS). Atypical cells generally reflect inflammation or, in some cases, reaction to HPV (human papilloma virus). Most young women will resolve these mild changes fairly quickly and will go into remission from HPV infection if that is the source. This is especially true for women under 21. Therefore, we do not need any further evaluation at this time. \n \nI recommend a routine follow-up pap smear one year from now.\n\nIf you have any further questions or concerns, please give our office a call or go to http://www.thehpvtest.com\n\n\n"
          },
          {
            "ABBREVIATION" : ".letpaplsil/hs",
            "UPDATED" : "",
            "CONTENTS" : "Your recent pap smear showed atypical cells.\nYour specific type of atypical cells generally reflect inflammation, or reaction to HPV (human papilloma virus) infection. Atypical cells are not necessarily pre-cancerous, and most women will go into remission from the HPV infection. However, we do want to stay on top of this.\n \nAt this time, we need to do a colposcopy to look more closely at your cervix. A colposcope is an instrument allowing the health care provider to visualize the cervix with a magnified lens and take a small biopsy of any abnormal areas.\n\nIf we have not already done so, our staff will be contacting you to schedule this procedure with one of the health care providers that performs colposcopy.\n\nIf you have any further questions or concerns, please give our office a call, or go to http://www.thehpvtest.com\n\n\n"
          },
          {
            "ABBREVIATION" : ".letpapnml-hpv",
            "UPDATED" : "",
            "CONTENTS" : "Both your recent pap smear and the test for high risk strains of HPV (human papilloma virus) were normal.\nI recommend a routine screening pap 5 years from now.\n \nIf you have any further questions or concerns, please give our office a call. \n\n"
          },
          {
            "ABBREVIATION" : ".letpapnml-hpv",
            "UPDATED" : "",
            "CONTENTS" : "Your pap smear showed normal cells. Testing for the HPV (Human Papilloma Virus) was positive. Sometimes this is an old infection, and sometimes it is a false positive, where the test is actually falsely reporting something that is not there..\nThe risk of having a significant abnormality however is very low, so we just need to repeat your pap smear in a year.\n\nIf you have any further questions or concerns, please give our office a call or go to http://www.thehpvtest.com\n\n\n"
          },
          {
            "ABBREVIATION" : ".letpapnml-noH",
            "UPDATED" : "",
            "CONTENTS" : "Your recent pap smear was normal.\nI recommend a routine screening pap 1 year from now.\n \nIf you have any further questions or concerns, please give our office a call. \n \n\n"
          },
          {
            "ABBREVIATION" : ".labrte-nl",
            "UPDATED" : "",
            "CONTENTS" : "Your recent test results were all fine- either normal or stable. \n\nOnline tools including http://www.labtestsonline.org are available to help you understand more about a particular test. You can also search Virginia Masons online health information encyclopedia at https://www.virginiamason.org/body.cfm?id=1215 for more information.\n\n\n"
          },
          {
            "ABBREVIATION" : ".labrtePed-nl",
            "UPDATED" : "",
            "CONTENTS" : "Your child's tests are within normal limits. No additional testing or change in treatment plan is necessary at this time.\nPlease contact my office if you have any questions.\n"
          },
          {
            "ABBREVIATION" : ".labrtePed_abn",
            "UPDATED" : "",
            "CONTENTS" : "Some of your child's test results returned outside of the normal range. _ I advise an appointment to review the results and discuss the next step. \nMy staff will call you to make an appointment.\nPlease contact my office if you have any questions. \n"
          },
          {
            "ABBREVIATION" : ".labrtePed_abn",
            "UPDATED" : "",
            "CONTENTS" : "Some of your child's test results returned outside of the normal range. This may not be concerning at this point so I advise repeating the tests before taking any other action. \nOrders have been placed in our computer system for follow-up tests. Please go to any Virginia Mason lab in _ months for a _non-fasting blood draw. My office will contact you with the results of the follow-up tests.\nPlease contact my office if you have any questions. \n"
          },
          {
            "ABBREVIATION" : ".labrtePed_abn",
            "UPDATED" : "",
            "CONTENTS" : "Some of your child's results returned outside of the normal range, but the results are stable or insignificant in this case. Follow up plan: _\nPlease contact my office if you have any questions. \n"
          },
          {
            "ABBREVIATION" : ".labrte_abn-ap",
            "UPDATED" : "",
            "CONTENTS" : "Some of your results returned outside of the normal range. _ I advise an appointment to review the results and discuss the next step. \nMy staff will call you to make an appointment.\nPlease contact my office if you have any questions.\n"
          },
          {
            "ABBREVIATION" : ".labrte_abn-re",
            "UPDATED" : "",
            "CONTENTS" : "Some of your results returned outside of the normal range. This may not be concerning at this point so I advise repeating the tests before taking any other action. \nOrders have been placed in our computer system for follow-up tests. Please go to any Virginia Mason lab in _ months for a _non-fasting blood draw. My office will contact you with the results of the follow-up tests.\nPlease contact my office if you have any questions. \n"
          },
          {
            "ABBREVIATION" : ".labrte_abn-st",
            "UPDATED" : "",
            "CONTENTS" : "Some of your results returned outside of the normal range, but the results are stable or insignificant in your case. Follow up plan: _\nPlease contact my office if you have any questions. \n"
          }
        ],
     departments1:[], rows:[]};
  },

  componentDidMount: function() {
    this.setState({departments1: this.state.departments});
  },

  renderHeader(label, cellDataKey) {
   return <div>
         <span>{label}</span>
           <div>
             <br />
             <input type="text" onChange={this.onFilterChange.bind(this, cellDataKey)}/>
           </div>
       </div>;
 },

  onFilterChange(cellDataKey, event) {
  if (!event.target.value) {
    this.setState({
      departments: this.state.departments1,
    });
  }
  var filterBy = event.target.value.toString().toLowerCase();
  var size = this.state.departments1.length;
  var filteredList = [];
  for (var index = 0; index < size; index++) {
    var v = this.state.departments1[index][cellDataKey];
    if (v.toString().toLowerCase().indexOf(filterBy) !== -1) {
      filteredList.push(this.state.departments1[index]);
    }
  }
  this.setState({
    departments: filteredList,
  });
},

 render: function(){
 var rows = this.state.departments;
 console.log(rows.length);
        return(<div>
          <Table
      height={100 + (rows.length * 500)}
      width={1000}
      rowsCount={rows.length}
      rowHeight={500}
      headerHeight={80}
      rowGetter={function(rowIndex) {
        var theRows = rows[rowIndex];
        return theRows;
      }}>

      <Column dataKey="ABBREVIATION" width={200} label="DotPhrase" headerRenderer={this.renderHeader} />
      <Column dataKey="CONTENTS" width={600} label="Contents" headerRenderer={this.renderHeader} />

    </Table>
  </div>);
     }

 });


ReactDOM.render(
 <DepartmentGridTable />,
  document.querySelector("#container")
);
