"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('Testing endpoints', function () {
    it('GET / - Should return 404', done => {
        supertest_1.default(app_1.default)
            .get('/')
            .expect(404, done);
    });
    it('GET /health - Should return 200 Ok', done => {
        supertest_1.default(app_1.default)
            .get('/health')
            .expect(200, done);
    });
});
//# sourceMappingURL=app.spec.js.map