import chai, { expect } from "chai";
import server from "../lib/app";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

describe("The Login Route", () => {
  it("Should return the welcome message", (done) => {
    chai
      .request(server)
      .get("/login")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should login successfully", (done) => {
    const login = {
      email: "inezabonte@gmail.com",
      password: "test@123",
    };
    chai
      .request(server)
      .post("/login")
      .send(login)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should not login", (done) => {
    const login = {
      email: "inezabonte@gmail.com",
    };
    chai
      .request(server)
      .post("/login")
      .send(login)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done(err);
      });
  });
});
