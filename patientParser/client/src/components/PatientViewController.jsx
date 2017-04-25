import React, { PropTypes } from 'react';

import PatientOverviewPage from '../containers/PatientOverviewPage.jsx';
import PatientDailyTodoPage from '../containers/PatientDailyTodoPage.jsx';
import PatientFollowUpsPage from '../containers/PatientFollowUpsPage.jsx';
import PatientFollowUpInputPage from '../containers/PatientFollowUpInputPage.jsx';
import PatientConsultsPage from '../containers/PatientConsultsPage.jsx';
import PatientConsultInputPage from '../containers/PatientConsultInputPage.jsx';
import PatientGeneralPage from '../containers/PatientGeneralPage.jsx';
import PatientLabsPage from '../containers/PatientLabsPage.jsx';
import PatientLearning from '../PatientLearning';
import PatientLearningInputPage from '../containers/PatientLearningInputPage.jsx';
import PatientLearningPage from '../containers/PatientLearningPage.jsx';

const PatientViewController = ({
  onUpdate,
  patientData,
  secretCode
}) => (
  <div>
    <div className="flex-grid">
      <div className="col">
        <PatientGeneralPage onUpdate={onUpdate} patientData={patientData} secretCode={secretCode}/>
      </div>
    </div>
    <div className="flex-grid">
      <div className="col">
        <PatientOverviewPage onUpdate={onUpdate} patientData={patientData} secretCode={secretCode}/>
      </div>
    </div>
    <div className="flex-grid">
      <div className="col">
        <PatientLabsPage onUpdate={onUpdate} patientData={patientData} secretCode={secretCode}/>
      </div>
      <div className="col">
        <PatientDailyTodoPage onUpdate={onUpdate} patientData={patientData}/>
      </div>
      <div className="col">
        <PatientFollowUpInputPage onUpdate={onUpdate} patientData={patientData} secretCode={secretCode} />
        <PatientFollowUpsPage onUpdate={onUpdate} patientData={patientData} secretCode={secretCode} />
      </div>
      <div className="col">
        <PatientConsultInputPage onUpdate={onUpdate} patientData={patientData} secretCode={secretCode} />
        <PatientConsultsPage onUpdate={onUpdate} patientData={patientData} secretCode={secretCode} />
      </div>
      <div className="col">
        <PatientLearningInputPage onUpdate={onUpdate} patientData={patientData} secretCode={secretCode} />
        <PatientLearningPage onUpdate={onUpdate} patientData={patientData} secretCode={secretCode} />
      </div>
    </div>
  </div>
)

PatientViewController.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  patientData: PropTypes.object.isRequired,
  secretCode: PropTypes.string.isRequired
};

export default PatientViewController;
