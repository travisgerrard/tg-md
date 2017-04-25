import React, { PropTypes } from 'react';

import PatientOverviewPage from '../containers/PatientOverviewPage.jsx';
import PatientDailyTodoPage from '../containers/PatientDailyTodoPage.jsx';
import PatientFollowUpsPage from '../containers/PatientFollowUpsPage.jsx';
import PatientFollowUpInputPage from '../containers/PatientFollowUpInputPage.jsx';
import PatientConsultsPage from '../containers/PatientConsultsPage.jsx';
import PatientConsultInputPage from '../containers/PatientConsultInputPage.jsx';
import LearningGeneralPage from '../containers/LearningGeneralPage.jsx';
import PatientLabsPage from '../containers/PatientLabsPage.jsx';
import LearningLearning from '../containers/LearningLearningPage.jsx';

const LearningViewController = ({
  onUpdate,
  patientData,
  secretCode
}) => (
  <div>
    <div className="flex-grid">
      <div className="col">
        <LearningGeneralPage onUpdate={onUpdate} patientData={patientData} secretCode={secretCode}/>
      </div>
    </div>
    <div className="flex-grid">
      <div className="col">
        <LearningLearning onUpdate={onUpdate} patientData={patientData} secretCode={secretCode} />
      </div>
    </div>
  </div>
)

LearningViewController.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  patientData: PropTypes.object.isRequired,
  secretCode: PropTypes.string.isRequired
};

export default LearningViewController;
