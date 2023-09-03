let expect = require('chai').expect;
let getGovernorMW = require('../../../../middlewares/Governors/getGovernorMW');
const {locals} = require("express/lib/application");

describe('getGovernor middleware', function() {
    it('should set res.locals.governor with a Governor object from db', function(done) {
        const mw = getGovernorMW({
            Governor: {
                findOne: (id, callBack) => {
                    expect(id).to.be.eql({_id: '1'});
                    callBack(null, 'mockGovernor');
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
            params: {
                id: '1'
            }
        }, resMock, () => {
            expect(resMock.locals).to.be.eql({governor: 'mockGovernor'});
            done();
        });
    });
    it('should call error in next', function(done) {
        const mw = getGovernorMW({
            Governor: {
                findOne: (id, callBack) => {
                    callBack('db error', 'mockGovernor');
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
            params: {
                id: '1'
            }
        }, resMock, (err) => {
            expect(err).to.be.eql('db error');
            done();
        });
    });
    it('should redirect to /governors', function(done) {
        const mw = getGovernorMW({
            Governor: {
                findOne: (id, callBack) => {
                    callBack(null, 'mockGovernor');
                }
            }
        });

        const resMock = {
            locals: {},
            redirect(where)  {
                expect(where).to.be.eql('/governors');
                done();
            }
        };

        mw({
            params: {
                id: 'undefined'
            }
        }, resMock, () => {

        });
    });
});