import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


		var goodBad = [
			{ id: 1, question: 'Good day', category: "goodBad" },
			{ id: 2, question: 'Bad day', category: "goodBad" },
		];

		var inOrOut = [
			{ id: 1, question: 'Inpatient', category: "inOrOut" },
			{ id: 2, question: 'Outpatient', category: "inOrOut" },
		];

		var progYear = [
			{ id: 1, question: 'MS3', category: "progYear" },
			{ id: 2, question: 'MS4', category: "progYear" },
			{ id: 3, question: 'PGY-1 (MEDICINE)', category: "progYear" },
			{ id: 4, question: 'PGY-1 (Preliminary / transitional / PA)', category: "progYear" },
			{ id: 5, question: 'PGY -2 (Senior)', category: "progYear" },
			{ id: 6, question: 'PGY-3 (Senior)', category: "progYear" },
			{ id: 7, question: 'PGY-4 (Amy and Ana)', category: "progYear" },
			{ id: 8, question: 'PGY-5 or more (Alvin, Paul)', category: "progYear" },
		];

		var purpose = [
			{ id: 1, question: 'I have a very clear idea about the purpose or meaning of my life', category: "purpose" },
			{ id: 2, question: 'I have a pretty good idea about the purpose or meaning of my life', category: "purpose"  },
			{ id: 3, question: 'I have a hint about my purpose in life', category: "purpose"  },
			{ id: 4, question: 'I do not know the purpose or meaning of my life', category: "purpose"  },
			{ id: 5, question: 'My life does not have any purpose or meaning', category: "purpose"  },
		];

		var joy = [
			{ id: 1, question: 'My life is filled with joy', category: "joy" },
			{ id: 2, question: 'I have much more joy than sorrow in my life', category: "joy" },
			{ id: 3, question: 'I have more joy than sorrow in my life', category: "joy" },
			{ id: 4, question: 'I have neither sorrow nor joy in my life', category: "joy" },
			{ id: 5, question: 'I have sorrow in my life', category: "joy" },
		];

		var interest = [
			{ id: 1, question: 'Most of the time I feel fascinated by what I am doing', category: "interest" },
			{ id: 2, question: 'Most of the time I feel quite interested in what I am doing', category: "interest" },
			{ id: 3, question: 'Most of the time I feel interested in what I am doing', category: "interest" },
			{ id: 4, question: 'Most of the time I feel neither bored nor interested in what I am doing', category: "interest" },
			{ id: 5, question: 'Most of the time I feel bored', category: "interest" },
		];

		var work = [
			{ id: 1, question: 'I truly love my work', category: "work" },
			{ id: 2, question: 'I really like my work', category: "work" },
			{ id: 3, question: 'For the most part, I like my work', category: "work" },
			{ id: 4, question: 'I feel neutral about my work', category: "work" },
			{ id: 5, question: 'I do not like my work (paid or unpaid)', category: "work" },
		];

		var future = [
			{ id: 1, question: 'I feel extraordinarily optimistic about my future', category: "future" },
			{ id: 2, question: 'I feel quite optimistic about my future', category: "future" },
			{ id: 3, question: 'I feel somewhat optimistic about my future', category: "future" },
			{ id: 4, question: 'I am neither optimistic nor pessimistic about my future', category: "future" },
			{ id: 5, question: 'I am pessimistic about my future', category: "future" },
		];

		var skill = [
			{ id: 1, question: 'My skills are always appropriately challenged by the situations I encounter', category: "skill" },
			{ id: 2, question: 'My skills are often appropriately challenged by the situations I encounter', category: "skill"  },
			{ id: 3, question: 'My skills are sometimes appropriately challenged by the situations I encounter', category: "skill"  },
			{ id: 4, question: 'My skills are occasionally appropriately challenged by the situations I encounter', category: "skill"  },
			{ id: 5, question: 'My skills are never appropriately challenged by the situations I encounter', category: "skill"  },
		];

		var qualityOfLife = [
			{ id: 1, question: 'As good as it can be', category: "qualityOfLife" },
			{ id: 2, question: 'Somewhat good', category: "qualityOfLife" },
			{ id: 3, question: 'Neutral', category: "qualityOfLife" },
			{ id: 4, question: 'Somewhat bad', category: "qualityOfLife" },
			{ id: 5, question: 'As bad as it can be', category: "qualityOfLife" },
		];

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    width: '400px'
  },
  paper: {
  width: '410px',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
}
};

const flexStyle = {
    questionBox: {
      marginBottom: 16,
    },
    overallStyle: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }
}

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
			goodBad     : null,
			inOrOut     : null,
			progYear    : null,
			purpose : null,
			joy      : null,
			interest   : null,
			work   : null,
			future   : null,
			skill   : null,
			qualityOfLife   : null,
      createdAt : null,
			freetext: null,
      open: true
    }
    this.makeRadioButton = this.makeRadioButton.bind(this);
    this.makeRadioButtonGroup = this.makeRadioButtonGroup.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

}

  makeRadioButton(itemList) {
    var listToReturn = itemList.map((item, i) => {
      return (
        <RadioButton
          id={item.category}
          value={item.question}
          label={item.question}
          style={styles.radioButton}
          key={i}
        />
      )
    })
    return listToReturn;
  }

  makeRadioButtonGroup(groupName, groupList) {
    return (
      <Card>
          <RadioButtonGroup
            name={groupName}
            defaultSelected="not_light"
            onChange={this.onUpdate}>
              {this.makeRadioButton(groupList)}
          </RadioButtonGroup>
      </Card>
    )
  }

  onUpdate(val) {
    console.log(val.target.value);
		console.log("radio selected", this.state);
		this.setState({
			createdAt: new Date()
		});
    // Super sneaky way to cut down on code - uses input data for case select and setState variables...
			switch (val.target.id) {
				case val.target.id:
						this.setState({
							[val.target.id]: val.target.value
						});
						break;
				default:
					this.setState({
						freetext: val.target.value
					});
					break;
			}
	}

  handleSubmit(e) {
  	e.preventDefault();
  	if (this.state.inOrOut
  		&& this.state.goodBad
  		&& this.state.progYear
  		&& this.state.purpose
  		&& this.state.joy
  		&& this.state.interest
  		&& this.state.work
  		&& this.state.skill
  		&& this.state.future
  	  && this.state.qualityOfLife) {
        // Function which helps stringify states (I guess....)
        function replacer(key,value)
        {
            if (key=="step") return undefined;
            else return value;
        }
        var currentDate = new Date();

        console.log(JSON.stringify(this.state));

        fetch("http://ec2-35-160-139-221.us-west-2.compute.amazonaws.com:3000/api/gdaybday", {
          method: 'post',
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this.state, replacer)//Here is where replacer is used
        }).then(function(data) {

        }.bind(this));

  		this.setState({
  			step : this.state.step + 1
  		});
  	} else {
      alert('A field is empty');
  	}

  }

  render() {
    switch (this.state.step) {
			case 1:
        return (
          <div style={flexStyle.overallStyle}>
            <h1>Good day / Bad day</h1>
            {this.makeRadioButtonGroup("goodBad", goodBad)}
            <br />
            {this.makeRadioButtonGroup("inOrOut", inOrOut)}
            <br />
            {this.makeRadioButtonGroup("progYear", progYear)}
            <br />
            {this.makeRadioButtonGroup("purpose", purpose)}
            <br />
            {this.makeRadioButtonGroup("joy", joy)}
            <br />
            {this.makeRadioButtonGroup("interest", interest)}
            <br />
            {this.makeRadioButtonGroup("work", work)}
            <br />
            {this.makeRadioButtonGroup("future", future)}
            <br />
            {this.makeRadioButtonGroup("skill", skill)}
            <h3 className="text-center">Quality of life</h3>
            {this.makeRadioButtonGroup("qualityOfLife", qualityOfLife)}
            <br />
            <Card>
              <textarea id="freetext" onChange={this.onUpdate} style={styles.radioButton} placeholder="Enter any questions, comments or concerns"/>
            </Card>
            <br />
            <Card>
              <RaisedButton label="Submit" primary={true} onClick={this.handleSubmit} />
            </Card>
            <br />
          </div>
        );
      case 2:
					return (
						<div>
						<h2>Thanks so much for your submission!</h2>
						</div>

					)
			}
  }
}
