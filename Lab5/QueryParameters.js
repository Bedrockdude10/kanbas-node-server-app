export default function QueryParameters(app) {
    app.get("/lab5/calculator", (req, res) => {
      const { a, b, operation } = req.query;
      let result = 0;
      // Ensure the parameters are correctly parsed as integers
      const numA = parseInt(a);
      const numB = parseInt(b);
  
      switch (operation) {
        case "add":
          result = numA + numB;
          break;
        case "subtract":
          result = numA - numB;
          break;
        case "multiply":
          result = numA * numB;
          break;
        case "divide":
          if (numB === 0) {
            result = "Cannot divide by zero";
          } else {
            result = numA / numB;
          }
          break;
        default:
          result = "Invalid operation";
          break;
      }
  
      // Ensure the result is a string to avoid being interpreted as a status code
      res.send(result.toString());
    });
  }
  