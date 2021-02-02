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
import useSWR from 'swr'
import useUser from "../lib/useUser";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const fetcher = (url) => fetch(url).then((r) => r.json());

const Home = () => {
  const { user, mutateUser } = useUser();
  const { data, error } = useSWR('/api/rooms', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const uploadMediaClick = (roomNumber) => {

    console.log(publicRuntimeConfig.cloudinaryCloudName);
    console.log(publicRuntimeConfig.cloudinaryUploadPreset);

    var myWidget = cloudinary.createUploadWidget({
      cloudName: publicRuntimeConfig.cloudinaryCloudName,
      upload_preset: publicRuntimeConfig.cloudinaryUploadPreset,
      showAdvancedOptions: false
    }, (error, result) => { 
      
      console.log('error: ' + error);
      console.log('result.event: ' + result.event);
      if (result.event == "success") {
        console.log(result.info);
      } 
      else {
        console.log(error);
      }
    })
  
    myWidget.update({tags: 'room-' + roomNumber});
    myWidget.open();
  }
  
  return (
    <Layout>
      <div className="component-container p-4">
        <div className="center-panel">
          <Row>
            {data.map((room) => {
              let buttons;
              
              if (user && user.login === room.owner) {
                buttons = 
                <Row>
                  <button 
                    name="upload_widget" 
                    className="btn btn-primary btn-sm"
                    onClick={uploadMediaClick.bind(this, room.number)}><FontAwesomeIcon icon={fasUpload} />&nbsp;Upload Video</button>
                  &nbsp;
                  <Button size="sm" className="btn-success"><FontAwesomeIcon icon={fasPlay} />&nbsp;Play Video</Button>
                </Row>;
              } 
              else {
                buttons = 
                <Row>
                  <Button size="sm" className="btn-warning"><FontAwesomeIcon icon={fasDownload} />&nbsp;Request Video</Button>
                </Row>;
              }

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
                      {buttons}
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

