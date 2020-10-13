/*
TEST ROUTES

// Searching SendFox for contacts
app.get("/sendfox", (req, res) => {
  searchContact(req.body.sAPIKEY, req.body.email)
    .then((result: any) => res.json(result))
    .catch((err: {}) => res.json(err));
});

app.post("/sendfox", (req, res) => {
  addContact(req.body.sAPIKEY, req.body)
    .then((result: any) => {
      res.json({
        id: result.result.id,
        name: result.result.first_name,
        email: result.result.email,
        status: result.status,
        msg: result.msg,
      });
    })
    .catch((err: {}) => {
      res.json(err);
    });
});

app.get("/", (req, res) => {
  res.send("Route Working");
});

// Getting subscribers from Moosend.
app.get("/moosend", (req, resp) => {
  getSubscribers(req.body)
    .then((res: any) => resp.json(res))
    .catch((err: any) => resp.json(err));
});

// Getting subscribers from MailerLite
app.get("/mailerlite", (req, res) => {
  getSub(req.body.mAPIKEY)
    .then((result: Array<any>) => {
      res.json(result);
    })
    .catch((err: {}) => res.json(err));
});

// Search and Update Subscribers in MailerLite
app.post("/mailerlite", (req, resp) => {
  const mAPIKEY = req.body.mAPIKEY;
  const result = { Email: req.body.email, Name: req.body.name };
  searchSub(result, mAPIKEY)
    .then((result: any) => {
      resp.json(result);
    })
    .catch((err: any) => {
      resp.json(err);
    });
});

*/
