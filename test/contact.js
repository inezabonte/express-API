import chai, { expect } from "chai";
import server from "../lib/app";
import chaiHttp from "chai-http";
import Contacts from "../lib/models/contact";

chai.use(chaiHttp);

describe("The Contact Route", () => {
  describe("/contact", () => {
    //when visiting the contact page
    it("Should return the welcome message", (done) => {
      chai
        .request(server)
        .get("/contact")
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          done();
        });
    });

    //should send a message
    it("should send message Successfully", (done) => {
      const message = {
        _id: "",
        name: "James Corden",
        email: "jamescorden@gmail.com",
        message: "Hi can we meet",
      };
      chai
        .request(server)
        .post("/contact")
        .send(message)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.name).to.equal("James Corden");
          expect(res.body.email).to.equal("jamescorden@gmail.com");
          expect(res.body.message).to.equal("Hi can we meet");
          done();
        });
    });

    // it("should not send message Successfully", (done) => {
    //   const message = {
    //     name: "James Corden",
    //     email: "jamescorden@gmail.com",
    //     number: "Hi, can we meet",
    //   };
    //   chai
    //     .request(server)
    //     .post("/contact")
    //     .send(message)
    //     .end((err, res) => {
    //       console.log(err);
    //       if (err) done(err);
    //       expect(res).status(400);
    //       expect(res).to.be.a("Object");
    //       done();
    //     });
    // });
  });
});
