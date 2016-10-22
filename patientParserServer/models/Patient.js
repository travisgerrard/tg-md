var mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema({
    basicInfo: [{
        name: String,
        room: String,
        Age: String,
        MRN: String,
        LOS: String
    }],
    labs: [{
        wbc: Number,
        hg: Number,
        hct: Number,
        plt: Number,
        na: Number,
        k: Number,
        cl: Number,
        bicarb: Number,
        bun: Number,
        cr: Number,
        glucose: Number,
        other: String
    }],
    dailyTodos: [{

    }],
    // Follow ups are going to be like comments, as you will be able to add and delete the them, they are not static...
    followUps: [{
        type: mongoose.Schema.Types.OnjectId,
        ref: 'FollowUp'
    }],
    hidden: Boolean

});

mongoose.model("Patient", PatientSchema);
