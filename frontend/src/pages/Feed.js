import React, { Component } from 'react';

import './Feed.css';
import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

import api from '../services/api';
import io from 'socket.io-client';

class Feed extends Component {

    state = {
        feed: []
    }

    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('posts');
        this.setState({feed: response.data});
    }

    registerToSocket = () => {
        // we pass our api host
        const socket = io('http://localhost:3333');
        // the server send to us 2 kinds of messages, POST and LIKE

        socket.on('post', newPost => {
            // we put the new post at the begining
            this.setState({feed: [newPost, ...this.state.feed]});
        });

        socket.on('like', likedPost => {
            // we put the new post at the begining
            this.setState({
                feed: this.state.feed.map( post => 
                    post._id == likedPost._id ? likedPost : post
                )
            });
        });
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }

    render() {
        return (
            <section id="post-list">
                { this.state.feed.map( post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>

                            <img src={more} alt="Mais" />

                        </header>

                        <img src={`http://localhost:3333/files/${post.image}`} alt="" />

                        <footer>
                            <div className="actions">
                                <button onClick={() => this.handleLike(post._id)}>
                                    <img src={like} alt="" />
                                </button>
                                <img src={comment} alt="" />
                                <img src={send} alt="" />
                            </div>
                            <strong>{post.likes} curtidas</strong>
                            <p>
                                {post.description}
                                <span>{post.hashtags}</span>
                            </p>
                        </footer>

                    </article>
                )) }
                
            </section>
        );
    }
}

export default Feed;