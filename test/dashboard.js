import chai, { expect } from "chai";
import server from "../lib/app";
import chaiHttp from "chai-http";
import "dotenv/config";

chai.use(chaiHttp);

describe("The dashboard Route", () => {
  //successfully display the welcome page of dashboard
  it("Should show the welcome page", (done) => {
    chai
      .request(server)
      .get("/dashboard")
      .set("auth-token", process.env.AUTH_TOKEN)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("Object");
        expect(res.body)
          .to.have.property("message")
          .eql("You are on the dashboard page");
        done();
      });
  });

  //successfully display the welcome page of profile page
  it("Should show the profile page", (done) => {
    chai
      .request(server)
      .get("/dashboard/profile")
      .set("auth-token", process.env.AUTH_TOKEN)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("Object");
        expect(res.body)
          .to.have.property("message")
          .eql("You are on the profile page");
        done();
      });
  });
});
