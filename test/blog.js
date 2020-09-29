import chai, { expect } from "chai";
import server from "../lib/app";
import chaiHttp from "chai-http";
import Articles from "../lib/models/articles";
import Comments from "../lib/models/comments";
import "dotenv/config";
import fs from "fs";

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

    //prevent posting empty article
    it("Should not post an empty article", (done) => {
      const article = new Articles({});
      article.save((err, res) => {
        chai
          .request(server)
          .post("/blog/newArticle")
          .set("auth-token", process.env.AUTH_TOKEN)
          .send(article)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done(err);
          });
      });
    });

    //title should be present
    it("Should not post article without title", (done) => {
      chai
        .request(server)
        .post("/blog/newArticle")
        .set("auth-token", process.env.AUTH_TOKEN)
        .set("Content-Type", "multipart/form-data")
        .attach("coverImage", fs.readFileSync("./images/code.png"), "code.png")
        .field("content", "a lot of work")
        .end((err, res) => {
          expect(res).to.have.status(400);
          done(err);
        });
    });

    //creating a complete article
    it("Should post article", (done) => {
      chai
        .request(server)
        .post("/blog/newArticle")
        .set("auth-token", process.env.AUTH_TOKEN)
        .set("Content-Type", "multipart/form-data")
        .attach("coverImage", fs.readFileSync("./images/code.png"), "code.png")
        .field("content", "a lot of work")
        .field("title", "A big title")
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(201);
          expect(res).to.be.a("Object");
          done();
        });
    });
  });

  describe("/blog/:postId", () => {
    //prevent posting empty comments
    it("Should not post an empty comment", (done) => {
      const blogId = "5f69e2afa5060612f957fb7b";
      const comment = new Comments({});
      comment.save((err, res) => {
        chai
          .request(server)
          .post(`/blog/${blogId}`)
          .send(comment)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done(err);
          });
      });
    });

    //Posting a comment with missing fields
    it("Shouldn't post a comment with missing field", (done) => {
      const blogId = "5f69e2afa5060612f957fb7b";
      const comment = new Comments({
        name: "Mark Cuban",
        blogId: blogId,
      });
      comment.save((err, res) => {
        chai
          .request(server)
          .post(`/blog/${blogId}`)
          .send(comment)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done(err);
          });
      });
    });

    // it("Should confirm article exists", (done) => {
    //   const blogId = "5f69e2afa5060612f957fb7b";
    //   Articles.exists({ _id: blogId }, (err, res) => {
    //     chai
    //       .request(server)
    //       .post(`/blog/${blogId}`)
    //       .end((err, res) => {
    //         if (err) done(err);
    //         expect(res).to.have.status(200);
    //         done();
    //       });
    //   });
    // });
  });
});
