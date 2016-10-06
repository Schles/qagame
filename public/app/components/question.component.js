"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var question_service_1 = require('../service/question.service');
var router_1 = require('@angular/router');
var QuestionComponent = (function () {
    function QuestionComponent(questionService, route) {
        var _this = this;
        this.questionService = questionService;
        this.route = route;
        this.uId = 25;
        this.setAnswer = function (aId) {
            var qId = _this.route.snapshot.params.id;
            questionService.setAnswer(qId, aId, _this.uId).subscribe(function (data) {
                var votes = JSON.parse(data._body);
                _this.question.voteCount = 0;
                for (var i in _this.question.answers) {
                    _this.question.answers[i].votes = 0;
                    for (var j in votes) {
                        if (_this.question.answers[i].aId == votes[j].aId) {
                            _this.question.answers[i].votes = votes[j].NUM;
                            _this.question.voteCount += votes[j].NUM;
                        }
                    }
                }
            }, function (error) { return _this.error = "error"; });
        };
        this.question = {};
    }
    QuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("init");
        this.uId = this.route.snapshot.params.uId;
        var qId = this.route.snapshot.params.id;
        this.questionService.getQuestion(this.uId, qId).subscribe(function (data) { return _this.question = data; }, function (error) { return _this.error = "error"; });
    };
    QuestionComponent.prototype.getPercentage = function (count) {
        if (this.question.voteCount <= 0)
            return 0;
        var p = count * 100 / this.question.voteCount;
        return Math.round(p * 10) / 10;
    };
    QuestionComponent = __decorate([
        core_1.Component({
            selector: 'question',
            template: "\n  <h1>{{question.qText}}</h1> <br>\n  <ul>\n       <li *ngFor=\"let answer of question.answers\" (click)=\"setAnswer(answer.aId)\">\n\n           <div class=\"card\">{{answer.aText}}</div>\n           <div class=\"result\"\n              *ngIf=\"question.voteCount > 0\">\n              <div class=\"bar\"\n               [style.width]=\"getPercentage(answer.votes) + 'px'\"></div>\n              {{getPercentage(answer.votes)}}%\n\n          </div>\n           <div class=\"clear\"></div>\n\n\n       </li>\n  </ul><br>\n  <div     *ngIf=\"question.voteCount > 0\">\n  VoteCount {{question.voteCount}}\n  </div>",
            providers: [question_service_1.QuestionService]
        }), 
        __metadata('design:paramtypes', [question_service_1.QuestionService, router_1.ActivatedRoute])
    ], QuestionComponent);
    return QuestionComponent;
}());
exports.QuestionComponent = QuestionComponent;
//# sourceMappingURL=question.component.js.map