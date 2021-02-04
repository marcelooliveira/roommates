import React from "react";
import Layout from "../components/Layout";
import {Row, Col} from 'react-bootstrap'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { faHome as fasHome, faBed as fasBed, faBath as fasBath, faCar as fasCar } from '@fortawesome/free-solid-svg-icons';
import { faUpload as fasUpload, faPlay as fasPlay, faDownload as fasDownload } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { default as NumberFormat } from 'react-number-format';
import useSWR, { mutate } from 'swr'
import useUser from "../lib/useUser";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const fetcher = (url) => fetch(url).then((r) => r.json());

const Home = () => {
  const { user, mutateUser } = useUser();
  const { data, error } = useSWR('/api/rooms2', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const uploadMediaClick = async (id) => {

    var myWidget = cloudinary.createUploadWidget({
      cloudName: publicRuntimeConfig.cloudinaryCloudName,
      upload_preset: publicRuntimeConfig.cloudinaryUploadPreset,
      showAdvancedOptions: true
    }, (error, result) => { 
      
      if (result.event == "success") {
        if (result.info.resource_type == "video") {
  
          var videoId = result.info.public_id;
          
          fetch('/api/room/' + id, {
            method: 'POST',
            body: JSON.stringify({ videoId: videoId }),
            headers: {
                 'Content-Type': 'application/json'
            },
          })
        }
      } 
      else {
        console.log(error);
      }
    })
  
    myWidget.update({tags: ['room-' + id]});
    myWidget.open();
  }
  
  return (
    <Layout>
      <div className="component-container p-4">
        <div className="center-panel">
          <Row>
            {data.map((room) => {
              let playButton;
              let buttons;
              
              if (user && user.login === room.owner) {
                buttons = 
                <span>
                  <button 
                  name="upload_widget" 
                  className="btn btn-primary btn-sm"
                  onClick={uploadMediaClick.bind(this, room.$loki)}><FontAwesomeIcon icon={fasUpload} />&nbsp;Upload Video</button>
                </span>;
              } 

              if (room.videoId) {
                playButton = 
                <Button 
                href={`/play-video/${room.number}`}
                target="_blank" size="sm" className="btn-success"><FontAwesomeIcon icon={fasPlay} />&nbsp;Play Video
                </Button>
              }

              // else {
              //   buttons = 
              //   <Row>
              //     <Button size="sm" className="btn-warning"><FontAwesomeIcon icon={fasDownload} />&nbsp;Request Video</Button>
              //   </Row>;
              // }

              return (
                <Col key={room.number} id="hits" className="col-xs-12 col-sm-6 col-md-4 p-3">
                  <Card className="shadow">
                    <img src={room.pic} className="card-img-top img-estate" />
                    <Card.Body>
                      <h5 className="card-title">
                        <NumberFormat value={room.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        &nbsp;/&nbsp;week
                        <FontAwesomeIcon icon={farHeart} className="text-danger float-right" />
                      </h5>
                      <Card.Text>{JSON.stringify(room)}</Card.Text>
                      <Card.Text><b>{room.address}</b></Card.Text>
                      <Card.Text><b>owner: {room.owner}</b></Card.Text>
                      <Card.Text className="description" title="{realEstate.description}">
                        <b>
                          <FontAwesomeIcon icon={fasBed} />
                          <span>&nbsp;{room.bedrooms}&nbsp;</span>
                          <FontAwesomeIcon icon={fasBath} />
                          <span>&nbsp;{room.bathrooms}&nbsp;</span>
                          <FontAwesomeIcon icon={fasCar} />
                          <span>&nbsp;{room.cars}&nbsp;</span>
                        </b>
                      </Card.Text>
                      <Row>
                        {buttons}
                        {playButton}
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

