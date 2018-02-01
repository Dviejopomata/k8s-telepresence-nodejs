const http = require("http");
const pingPython = () =>
  new Promise((resolve, reject) => {
    const req = http.get("http://hello-world:8100", res => {
      let data = "";
      res.on("data", newData => (data += newData.toString()));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    });
    req.end();
  });

const guid = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};
const id = guid();

const server = http.createServer((req, res) => {
  if (req.url.includes("favicon")) {
    return res.end();
  }
  if (req.url.includes("python")) {
    pingPython()
      .then(data => {
        res.write(data);
        res.end();
      })
      .catch(err => {
        res.write(err.message);
        res.statusCode = 400;
        res.end();
      });
  } else {
    var a = "223232";
    res.write(`Hello world instanceId=${id} ${a} `);
    res.end();
  }
});

const instance = server.listen(
  process.env.PORT || 3000,
  process.env.HOST || "0.0.0.0",
  () => {
    const { address, port } = instance.address();
    console.log(`${address}:${port}`);
  }
);
