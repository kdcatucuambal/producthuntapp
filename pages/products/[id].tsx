import React, {useContext, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {FirebaseContext} from "../../firebase";
import {IProduct} from "../../models/app.interfaces";
import {DocumentSnapshot} from "@firebase/firestore-types";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";
import {css} from '@emotion/react';
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {Field, InputSubmit} from '../../components/ui/Form';
import Button from "../../components/ui/Button";
import {Comment} from '../../models/app.interfaces'

const ProductContainer = styled.div`
  @media (min-width: 169px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const ProductCreator = styled.p`
  padding: .5rem 2rem;
  background-color: #DA552F;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline;
  text-align: center;
`;

const Product = () => {
    //Routing for get current id
    const router = useRouter();
    const productId = router.query['id'];
    const [product, setProduct] = useState<IProduct>();
    const [error, setError] = useState(false);
    const [comment, setComment] = useState<Comment>(
        {comment: "", userName: "", userId: ""});
    const [consultDB, setConsultDB] = useState(true);
    //context of firebase
    const {firebase, auth} = useContext(FirebaseContext);
    useEffect(() => {
        if (productId && consultDB) {
            const getProduct = async () => {
                await firebase.db.collection('products').doc(productId.toString())
                    .onSnapshot(handleSnapshot);
                //const product = await productQuery.get();

            }
            getProduct();
        }
    }, [productId]);

    function handleSnapshot(snapshot: DocumentSnapshot<IProduct>) {
        if (snapshot.exists) {
            const product = snapshot.data();
            setProduct(product);
            setConsultDB(false);
        } else {
            setError(true);
            setConsultDB(false);
        }
    }

    const likeProduct = () => {
        if (!auth) return router.push("/login");

        //get and added a new like
        const newTotal = product.likes + 1;

        //Check user
        if (product.haveVoted.includes(auth.uid)) return;

        //Save user id
        const votes = [...product.haveVoted, auth.uid];
        //Update database
        firebase.db.collection('products').doc(productId.toString())
            .update({likes: newTotal, haveVoted: votes});
        //Update state
        setProduct({
            ...product,
            likes: newTotal
        });
        setConsultDB(true); //consult there is a like
    }

    if (!product && !error) return "Loading ...";

    //Comments functions
    const commentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }

    const isCreator = (id: string) => {
        if (product.creator.id === id) {
            return true;
        }
        return false;
    }

    const addComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!auth) {
            return router.push('/login');
        }

        comment.userName = auth.displayName;
        comment.userId = auth.uid;
        const newComments = [...product.comments, comment];

        firebase.db.collection('products').doc(productId.toString()).update({
            comments: newComments
        })

        setProduct({
            ...product,
            comments: newComments
        })
        setConsultDB(true); //consult there is a comment
    }

    return (
        <Layout>
            <>
                {error ? <Error404/> : (
                    <div className="contenedor">
                        <h1 css={css`text-align: center;
                          margin-top: 5rem`}>{product.name}</h1>
                        <ProductContainer>
                            <div>
                                <p>Posted ago: {formatDistanceToNow(new Date(product.created))}</p>
                                <p>By {product.creator.name} from {product.company}</p>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={product.image}/>
                                <p>{product.description}</p>
                                {auth && (<>
                                    <h2>Add your comment</h2>
                                    <form onSubmit={addComment}>
                                        <Field>
                                            <input type="text" name="comment" onChange={commentChange}/>
                                        </Field>
                                        <InputSubmit type="submit" value="Add comment"/>
                                    </form>
                                </>)}
                                <h2 css={css`margin: 2rem 0`}>Comments</h2>
                                {product.comments.length === 0 ? 'There are no comments' : (<ul>
                                    {product.comments.map((comment, i) => (
                                        <li
                                            key={`${comment.userId}.${i.toString()}`}
                                            css={css`
                                              border: 1px solid #e1e1e1;
                                              padding: 2rem;
                                            `}
                                        >
                                            <p>{comment.comment}</p>
                                            <p>Posted by: <span css={css`
                                              font-weight: bold;
                                            `}>
                                            {comment.userName}
                                        </span></p>
                                            {isCreator(comment.userId) && (
                                                <ProductCreator>You are creator</ProductCreator>)}
                                        </li>
                                    ))}
                                </ul>)}
                            </div>
                            <aside>
                                <Button target="_blank" bgColor="true" href={product.url}>Visit URL</Button>
                                <div css={css`margin-top: 5rem`}>
                                    <p css={css`text-align: center`}>{product.likes} likes</p>
                                    {auth && (<Button onClick={likeProduct}>Like</Button>)}
                                </div>
                            </aside>
                        </ProductContainer>
                    </div>
                )}
            </>
        </Layout>
    );
};

export default Product;
