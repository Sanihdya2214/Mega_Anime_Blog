import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import Button from "../Components/Button";
import Container from "../Components/Container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthor, setIsAuthor] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    setLoading(false);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
            setLoading(false);
        }
    }, [slug, navigate]);

    useEffect(() => {
        if (post && userData) {
            setIsAuthor(post.userId === userData.$id);
        }
    }, [post, userData]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return loading ? (
        <div className="flex justify-center items-center min-h-screen">
            <p>Loading...</p>
        </div>
    ) : post ? (
        <div className="py-8">
            <Container>
                {isAuthor && (
                    <div className="w-full flex justify-end mb-4">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
                <div className="w-full flex justify-center mb-4 border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css mb-6">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
