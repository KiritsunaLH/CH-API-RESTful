let Container = require('./container');
let path = require('path');
let express = require('express');
const PORT = 8080
let app = express();
let {Router} = express;
let router = new Router;

app.use(express.static("public"))
app.use("/api/products", router)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let container = new Container("./products.json");

router.get("/", (req,res,next) => {
    container.getAll().then(data => {
        res.send(data);
    }).catch(error => {
        res.send(error);
    });
});

router.get("/:id", (req, res, next) => {
    let id = req.params.id;    
    container.getbyId(id).then(data => {
        if(data){
            res.send(data);
        }else{
            res.send("{error: no products were found}"); 
        }
    }).catch(error => {
        res.send(error);
    });
});


router.post("/", (req, res, next) => {
    console.log(req.body.product.price);
    container.save(req.body.product).then(data => { 
        res.json(data);
        }).catch(error => {
            res.send(error);
    });
});

router.put("/",(req,res,next) => {
    let product = req.body;
    container.update(product).then(data => {
        res.json(data);
    }).catch(error => {
        res.send(error);
    });
});

router.delete("/:id", (req, res, next) => {
    let id = req.params.id
    container.deleteById(id).then(data => {
        res.send(data);
    }).catch(error => {
        res.send(error);
});
});

app.use("/api/products", router);
app.use("/api",express.static(path.join(__dirname, 'public','index.html')));
app.get("/", (req,res,next) => {
    
    res.send("<h1>Shop for products</h1>");
    });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});