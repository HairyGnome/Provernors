let expect = require('chai').expect;
let getProvinceMW = require('../../../../middlewares/Provinces/getProvinceMW');

describe('getProvince middleware', function() {
    it('should set res.locals.province with a Province object from db', function(done) {
        const mw = getProvinceMW({
            Province: {
                findOne: (id, callBack) => {
                    expect(id).to.be.eql({_id: '1'});
                    callBack(null, 'mockProvince');
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
            expect(resMock.locals).to.be.eql({province: 'mockProvince'});
            done();
        });
    });
    it('should call error in next', function(done) {
        const mw = getProvinceMW({
            Province: {
                findOne: (id, callBack) => {
                    callBack('db error', 'mockProvince');
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
    it('should redirect to /province', function(done) {
        const mw = getProvinceMW({
            Province: {
                findOne: (id, callBack) => {
                    callBack(null, 'mockProvince');
                }
            }
        });

        const resMock = {
            locals: {},
            redirect(where)  {
                expect(where).to.be.eql('/provinces');
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