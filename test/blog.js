import chai, { expect } from "chai";
import server from "../app";
import chaiHttp from "chai-http";
import Articles from "../models/articles";
chai.use(chaiHttp);

describe("The Blog Page", () => {
  //Retrive all articles I wrote
  describe("GET /blog", () => {
    it("Should return all the articles", (done) => {
      chai
        .request(server)
        .get("/blog")
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.a("object");
          done();
        });
    });
  });
});
