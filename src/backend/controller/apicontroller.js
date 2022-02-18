const fetch = require("node-fetch");
var axios = require("axios");

const search = async (req, res) => {
  let url;
  if (req.query.limit) {
    url = `https://medium.com/_/api/tags/${req.query.tag}/stream?limit=10&ignoredIds=${req.query.limit}`;
  } else {
    url = `https://medium.com/_/api/tags/${req.query.tag}/stream?limit=10`;
  }
  //   const response = await fetch(url)
  //     .then((response) => response.text())
  //     .then((result) => JSON.parse(result.slice(16)))
  //     .catch((error) => console.log("error", error));

  var config = {
    method: "get",
    url: url,
  };

  axios(config)
    .then(function (result) {
      let response = JSON.parse(result.data.slice(16));

      let info = [];
      let relatedTags = [];
      let tags = [];

      if (response.payload) {
        for (let i = 0; i < response.payload.relatedTags.length; i++) {
          relatedTags.push(response.payload.relatedTags[i].name);
        }
        if (response.payload.references.Post) {
          const post = Object.keys(response.payload.references.Post);

          const user = Object.keys(response.payload.references.User);
          for (let i = 0; i < post.length; i++) {
            var postid = response.payload.references.Post[post[i]].id;
            var image =
              response.payload.references.Post[post[i]].virtuals.previewImage
                .imageId;
            var title = response.payload.references.Post[post[i]].title;
            var readingtime = Math.round(
              response.payload.references.Post[post[i]].virtuals.readingTime
            );
            var tagsobject =
              response.payload.references.Post[post[i]].virtuals.tags;

            for (let k = 0; k < user.length; k++) {
              if (
                user[k] == response.payload.references.Post[post[i]].creatorId
              )
                var author = response.payload.references.User[user[k]].name;
            }

            let tagarr = [];
            for (let j = 0; j < tagsobject.length; j++) {
              tagarr.push(tagsobject[j].name);
            }
            tags[i] = tagarr;
            info[i] = { postid, image, title, readingtime, author, tagarr };
          }
        }
        if (response.payload.paging.previous?.ignoredIds) {
          var prev = response.payload.paging.previous.ignoredIds;
        }

        if (response.payload.paging.next) {
          var next = response.payload.paging.next.ignoredIds;
        }
        let payload = [{ relatedTags, info, next, prev }];

        res.send(payload);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

const post = async (req, res) => {
  var config = {
    method: "get",
    url: `https://medium.com/_/api/posts/${req.query.id}`,
  };

  axios(config)
    .then(async function (result) {
      let response = JSON.parse(result.data.slice(16));
      let postdesc = response.payload.value.content.bodyModel.paragraphs;
      //   const commentsresponse = await fetch(
      //     `https://medium.com/_/api/posts/${req.query.id}/responsesStream?filter=other`
      //   )
      //     .then((res) => res.text())
      //     .then((json) => JSON.parse(json.slice(16)));
      var config = {
        method: "get",
        url: `https://medium.com/_/api/posts/${req.query.id}/responsesStream?filter=other`,
      };

      axios(config)
        .then(function (result) {
          let commentsresponse = JSON.parse(result.data.slice(16));
          const post = Object.keys(commentsresponse.payload.references.Post);
          const info = [];
          for (let i = 1; i < post.length; i++) {
            let comments =
              commentsresponse.payload.references.Post[post[i]].previewContent
                .bodyModel.paragraphs[0].text;
            let cid =
              commentsresponse.payload.references.Post[post[i]].creatorId;
            let name = commentsresponse.payload.references.User[cid].name;
            info[i] = { name, comments };
          }
          res.render("post", {
            postdesc,
            info,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
  //   const response = await fetch(`https://medium.com/_/api/posts/${req.query.id}`)
  //     .then((res) => res.text())
  //     .then((json) => JSON.parse(json.slice(16)));
};

module.exports = {
  search,
  post,
};
