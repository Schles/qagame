"use strict";
var question_component_1 = require('./components/question.component');
exports.ContactsAppRoutes = [
    { path: '', component: question_component_1.QuestionComponent },
    { path: 'q/:id/:uId', component: question_component_1.QuestionComponent },
    { path: 'a/:id', component: question_component_1.QuestionComponent },
];
//# sourceMappingURL=app.routes.js.map