import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from "react-dropzone";
import ImageWrapper from './ImageWrapper/ImageWrapper';


//Imports Material UI components:
import { Box, CardContent, TextField, InputAdornment, Button, Paper, Typography }from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './styles';

import { getCategories } from '../../../../actions/admin/admin_actions';
import { deleteProductImage } from '../../../../actions/admin/admin_actions';
import { createProduct } from '../../../../actions/admin/admin_actions';


export default function CreateForm() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        price: '',
        stock: 1,
        description: '',
        categories: [],
        images: []
    })

    //---------------------------------------------------------//
    //---------------------VALIDATIONS------------------------//
    //-------------------------------------------------------//

    //---ERROR MESSAGES STATE---//
    const [errors, setErrors] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        categories: '',
        images: ''
    })

    //----NAME VALIDATION----//
    useEffect(()=> {
        nameValidator()
    }, [product.name])
    
    const nameValidator = () => {
        if(!product.name) return setErrors({...errors, name: "You must provide a product name."})
        if(product.name.length>50) return setErrors({...errors, name: "The name cannot be longer than 50 characters."})
        if(product.name.length<2) return setErrors({...errors, name: "The name cannot be that short."})
        if((!/^[A-Za-z]+$/.test(product.name))) return setErrors({...errors, name: "The name should only contain letters."})
        else setErrors({...errors, name: ""})
    }

    //----PRICE VALIDATION----//
    useEffect(()=> {
        priceValidator()
    }, [product.price])
    
    const priceValidator = () => {
        if(!product.price) return setErrors({...errors, price: "Your product must have a price."})
        if(product.price<1) return setErrors({...errors, price: "Price cannot be a negative number."})
        else setErrors({...errors, price: ""})
    }

    //----STOCK VALIDATION----//
    useEffect(()=> {
        stockValidator()
    }, [product.stock])
    
    const stockValidator = () => {
        if(!product.stock) return setErrors({...errors, stock: "You must enter an amount of products available."})
        if(product.stock<1) return setErrors({...errors, stock: "Stock cannot be less than one."})
        else setErrors({...errors, stock: ""})
    }

    //----CATEGORIES VALIDATION----//
    useEffect(()=> {
        categoriesValidator()
    }, [product.categories])
    
    const categoriesValidator = () => {
        if(!product.categories.length) return setErrors({...errors, categories: "You must enter at least one category."})
        else setErrors({...errors, categories: ""})
    }

    //----IMAGES VALIDATION----//
    useEffect(()=> {
        imagesValidator()
    }, [product.images])
    
    const imagesValidator = () => {
        if(!product.images.length) return setErrors({...errors, images: "You must upload at least one image."})
        else setErrors({...errors, images: ""})
    }

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



    const handleSubmit= () => {
        console.log(product.name, errors.name)
        for(let error in errors) {
            if(errors[error]) return alert('Make sure all inputs are okay.')
        }
        dispatch(createProduct(product))
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
    }
    
    const categories = useSelector((state) => state.adminReducer.categories)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
    },[])

    const classes = useStyles();

    const onDelete = async (file) => {
        dispatch(deleteProductImage(file))
        setUploadedFiles(uploadedFiles.filter((item) => item.secure_url !== file.secure_url));
    }

    const onDrop = (acceptedFiles) => {
        
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


    return (
        <Box className={classes.root}>
            <CardContent className={classes.tabContainer}>
                <form className= {classes.form}>
                    <TextField value= {product.name} onChange= {(e)=> setProduct({...product, name: e.target.value})} className= {classes.input} id="outlined-basic" label="Name" variant="outlined" />
                    <Box className= {classes.errors}>{errors.name}</Box>
                    
                    <TextField value= {product.price} onChange= {(e)=> setProduct({...product, price: e.target.value})} className= {classes.input} id="outlined-number" label="Price" type="number" InputLabelProps={{shrink: true,}} variant="outlined" InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,}}/>
                    <Box className= {classes.errors}>{errors.price}</Box>
                    
                    <TextField value= {product.stock} onChange= {(e)=> setProduct({...product, stock: e.target.value})} className= {classes.input} id="outlined-number" label="Stock" type="number" InputLabelProps={{shrink: true,}} variant="outlined"/>
                    <Box className= {classes.errors}>{errors.stock}</Box>
                    
                    <TextField value= {product.description} onChange= {(e)=> setProduct({...product, description: e.target.value})} className= {classes.input} id="outlined-basic" label="Description" variant="outlined" multiline />

                <Autocomplete
                    id= 'categorySelector'
                    className = {classes.input}
                    options={categories}
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
                <Box className= {classes.errors}>{errors.categories}</Box>
                <Paper elevation={5} className = {classes.selectedCategories}>
                    {selectedCategories.map((category)=> (
                        <Paper key= {category} className= {classes.selectedCategory}>
                            <Typography>{category}</Typography>
                            <Button onClick= {() =>setSelectedCategories(selectedCategories.filter(c => c !== category))} value={category}  className= {classes.removeCategory}>X</Button>
                        </Paper>
                    ))}
                </Paper>
                
                <div
                    {...getRootProps()}
                    className={`${classes.dropzone} ${isDragActive ? classes.active : null}`}
                >
                    <input {...getInputProps()} />
                    Drag & drop product images
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
                <Box className= {classes.errors}>{errors.images}</Box>
                

                    <Button onClick={handleSubmit} className = {classes.button}>Create</Button>
                </form>
            </CardContent>
    </Box>
    )
}