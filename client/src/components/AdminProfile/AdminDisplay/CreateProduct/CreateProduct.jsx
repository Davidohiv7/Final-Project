import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from "react-dropzone";
import ImageWrapper from './ImageWrapper/ImageWrapper';

//Imports Material UI components:
import { Box, CardContent, TextField, InputAdornment, Button, Paper, Typography }from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './styles';

import { getAllCategories, deleteImages, deleteProductImage, createProduct, updateProduct, deleteProduct } from '../../../../actions/admin/admin_actions';


export default function CreateForm({ setDisplayStatus, editProduct }) {
    const [selectedCategories, setSelectedCategories] = useState(editProduct? editProduct.Categories.map(c => c.name): []);
    const [uploadedFiles, setUploadedFiles] = useState(editProduct? editProduct.Images.map(i => ({ secure_url:i.url, name: i.name})): []);
    const [product, setProduct] = useState({
        id: editProduct? editProduct.id: '',
        name: editProduct? editProduct.name: '',
        price: editProduct? editProduct.price: '',
        stock: editProduct? editProduct.stock: 1,
        description: editProduct? editProduct.description: '',
        categories: editProduct? editProduct.Categories.map(c => c.name): [],
        images: editProduct? editProduct.Images.map(i => ({ secure_url:i.url, name: i.name})): []
    })

    const [open, setOpen] = useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }



    //---------------------------------------------------------//
    //---------------------VALIDATIONS------------------------//
    //-------------------------------------------------------//

    //---ERROR MESSAGES STATE---//
    const [eName, setEname] = useState('')
    const [ePrice, setEprice] = useState('')
    const [eStock, setEstock] = useState('')
    const [eCategories, setEcategories] = useState('')
    const [eImages, setEimages] = useState('')

    //----TOUCH FIELD STATE---//
    const [nameTouch, setNameTouch]= useState(false)
    const [priceTouch, setPriceTouch]= useState(false)
    const [stockTouch, setStockTouch]= useState(false)
    const [categoriesTouch, setCategoriesTouch]= useState(false)
    const [ImageTouch, setImageTouch]= useState(false)



    //----NAME VALIDATION----//
    const nameValidator = () => {
        if(!product.name) return setEname("You must provide a product name.")
        if(product.name.length>100) return setEname("The name cannot be longer than 50 characters.")
        if(product.name.length<2) return setEname("The name cannot be that short.")
        else setEname("")
    }
    /* eslint-disable */
    useEffect(()=> {
        nameValidator()
    },[product.name])

    //----PRICE VALIDATION----//
    const priceValidator = () => {
        if(!product.price) return setEprice("Your product must have a price.")
        if(product.price<1) return setEprice("Price cannot be a negative number.")
        else setEprice("")
    }
    useEffect(()=> {
        priceValidator()
    },[product.price])

    //----STOCK VALIDATION----//
    const stockValidator = () => {
        if(!product.stock) return setEstock("You must enter an amount of products available.")
        if(product.stock<1) return setEstock("Stock cannot be less than one.")
        else setEstock("")
    }
    useEffect(()=> {
        stockValidator()
    },[product.stock])
    //----CATEGORIES VALIDATION----//
    const categoriesValidator = () => {
        if(!product.categories.length) return setEcategories("You must enter at least one category.")
        else setEcategories("")
    }
    useEffect(()=> {
        categoriesValidator()
    },[product.categories])

    //----IMAGES VALIDATION----//
    const imagesValidator = () => {
        if(!product.images.length) return setEimages("You must upload at least one image.")
        else setEimages("")
    }
    useEffect(()=> {
        imagesValidator()
    },[product.images])

//----------------------------------------//
//-------------VALIDATIONS ENDS------------//
//----------------------------------------//


useEffect(() => {
    setProduct({
            ...product,
            categories: selectedCategories
        })
    }, [selectedCategories])
    
    useEffect(() => {
        setProduct({
            ...product,
            images: uploadedFiles.map((img) => img.secure_url)
        })
    }, [uploadedFiles])

    const { imagesToDelete } = useSelector((state)=> state.adminReducer)
    
    
    const handleSubmit= () => {
        nameValidator()
        priceValidator()
        stockValidator()
        categoriesValidator()
        imagesValidator()
        if(!eName && !ePrice && !eStock && !eCategories && !eImages){
            if(editProduct) {
                dispatch(updateProduct(product))
                dispatch(deleteImages(imagesToDelete))
                setOpen(true)
            }
            else{
                dispatch(createProduct(product))
                dispatch(deleteImages(imagesToDelete))
                setProduct({
                name: '',
                price: '',
                stock: 1,
                description: '',
                categories: [],
                images: []
                })
                setSelectedCategories([])
                setUploadedFiles([])
                setDisplayStatus('products')
                } 
        }
    }

    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
        setDisplayStatus('products')
    }
    
    const allCategories = useSelector((state) => state.adminReducer.allCategories)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories())
    },[])
    /* eslint-enable */

    const classes = useStyles();

    const onDelete = async (file) => {
        dispatch(deleteProductImage(file))
        setUploadedFiles(uploadedFiles.filter((item) => item.secure_url !== file.secure_url));
    }

    const onDrop = (acceptedFiles) => {
        setImageTouch(true)
        const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
        acceptedFiles.forEach(async (acceptedFile) => {

            const formData = new FormData();
            formData.append('file', acceptedFile);
            formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
            formData.append("api_key", process.env.REACT_APP_CLOUDINARY_KEY);

            const response = await fetch(url, {
                method: "post",
                body: formData,
            });
            const data = await response.json();
            setUploadedFiles((old) => [...old, data]);
        })
    };

    // Use Dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accepts: "image/*",
        multiple: true,
        maxFiles: 4
    });

    console.log(allCategories)

    return (
            <CardContent className={classes.container}>
                <Box className= {classes.buttonContainer}>
                    <Button onClick={()=> setDisplayStatus('products')} className = {classes.cancel}>Cancel</Button>
                    <Button onClick={handleSubmit} className = {classes.button}>Save</Button>
                </Box>
                <form className= {classes.form}>
                    <TextField onClickCapture = {()=>setNameTouch(true)} helperText={nameTouch && (<Typography className={classes.errorText}>{eName}</Typography>)} value= {product.name} onChange= {(e)=> setProduct({...product, name: e.target.value})} className= {classes.input} id="outlined-basic" label="Name" variant="outlined" />
                    
                    <TextField onClickCapture = {()=>setPriceTouch(true)} helperText={priceTouch &&(<Typography className={classes.errorText}>{ePrice}</Typography>)} value= {product.price} onChange= {(e)=> setProduct({...product, price: e.target.value})} className= {classes.input} id="outlined-number" label="Price" type="number" InputLabelProps={{shrink: true,}} variant="outlined" InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,}}/>

                    
                    <TextField onClickCapture = {()=>setStockTouch(true)} helperText={stockTouch &&(<Typography className={classes.errorText}>{eStock}</Typography>)} value= {product.stock} onChange= {(e)=> setProduct({...product, stock: e.target.value})} className= {classes.input} id="outlined-number" label="Stock" type="number" InputLabelProps={{shrink: true,}} variant="outlined"/>
                    
                    <TextField value= {product.description} onChange= {(e)=> setProduct({...product, description: e.target.value})} className= {classes.input} id="outlined-basic" label="Description" variant="outlined" multiline />

                    <Autocomplete
                        onClickCapture = {()=>setCategoriesTouch(true)}
                        id= 'categorySelector'
                        className = {classes.input}
                        options={allCategories}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Categories" variant="outlined" />}
                        onChange={(e, v) => {
                            if(v){
                                if(!selectedCategories.includes(v.name)) {
                                    if(selectedCategories.length >= 10) alert('You can set up to 10 categories to a single product.')
                                    else setSelectedCategories([...selectedCategories, v.name])
                                }
                            }
                        }}
                    />
                    {categoriesTouch &&(<Typography className={classes.errorText}>{eCategories}</Typography>)}

                    <Paper elevation={5} className = {classes.selectedCategories}>
                        {selectedCategories.map((category)=> (
                            <Paper key= {category} className= {classes.selectedCategory}>
                                <Typography>{category}</Typography>
                                <Button onClick= {() => setSelectedCategories(selectedCategories.filter(c => c !== category))} value={category}  className= {classes.removeCategory}>X</Button>
                            </Paper>
                        ))}
                    </Paper>

                    <div
                        {...getRootProps()}
                        className={`${classes.dropzone} ${isDragActive ? classes.active : null}`}
                    >
                        <input {...getInputProps()} />
                    <Typography className={classes.dragTypo}>Drag & drop product images</Typography>
                    </div>

                    <ul className={classes.images}>
                        {uploadedFiles.map((file) => (
                        <li className= {classes.image} key={file.name}>
                            <ImageWrapper
                                height= '10px'
                                file={file}
                                onDelete={onDelete}
                            />
                        </li>
                        ))}
                    </ul>
                    {ImageTouch &&(<Typography className={classes.errorText}>{eImages}</Typography>)}
                </form>

                {editProduct && <Button onClick={()=> {handleDelete(editProduct.id)}} className= {classes.delete}>DELETE PRODUCT</Button>}
                {editProduct && (
                <Snackbar open={open} autoHideDuration={4000} onClose={()=> setOpen(false)}>
                    <Alert onClose={()=> setOpen(false)} severity="success">
                    The product has been updated succesfully!
                    </Alert>
                </Snackbar>
                )}
            </CardContent>
    )
}
