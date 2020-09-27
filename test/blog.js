import chai, { expect } from "chai";
import server from "../app";
import chaiHttp from "chai-http";
import Articles from "../models/articles";
import Comments from "../models/comments";
import "dotenv/config";

chai.use(chaiHttp);

describe("The Blog Route", () => {
  describe("/blog", () => {
    //Retrieve all articles I wrote
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

    //Retrieve a specific article
    it("Should return one article", (done) => {
      const id = "5f69e2afa5060612f957fb7b";

      chai
        .request(server)
        .get(`/blog/${id}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.a("object");
          done();
        });
    });

    //when the article doesn't exist
    it("Should return error 404 Not Found", (done) => {
      const id = "69e2afa506062f957fb7b";

      chai
        .request(server)
        .get(`/blog/${id}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done(err);
        });
    });
  });

  describe("/blog/newArticle", () => {
    //accessing page without authentication
    it("Should not give user access to unauthorised users", (done) => {
      chai
        .request(server)
        .get("/blog/newArticle")
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401);
          done();
        });
    });

    //give access to authorised users
    it("Should give access to authorised users", (done) => {
      chai
        .request(server)
        .get("/blog/newArticle")
        .set("auth-token", process.env.AUTH_TOKEN)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          done();
        });
    });

    //revoke access to invalid token
    it("Should deny access to wrong token", (done) => {
      const token = "jdsbsdfhdsvhsdvhjasbau83";
      chai
        .request(server)
        .get("/blog/newArticle")
        .set("auth-token", token)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
