import { useRouter } from 'next/router'
import React from "react";
import Layout from "../../components/Layout";
import {Row, Col} from 'react-bootstrap'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { faHome as fasHome, faBed as fasBed, faBath as fasBath, faCar as fasCar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { default as NumberFormat } from 'react-number-format';
import useSWR from 'swr'
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const fetcher = (url) => fetch(url).then((r) => r.json());

const PlayVideo = () => {
  const router = useRouter()
  const { roomNumber } = router.query;

  const { data, error } = useSWR('/api/rooms/' + roomNumber, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  
  const videoUrl = 'https://player.cloudinary.com/embed/'
  + '?cloud_name=' + publicRuntimeConfig.cloudinaryCloudName
  + '&public_id=' + data.videoId
  + '&fluid=true&controls=true&source_types%5B0%5D=mp4';

  return (
    <Layout>
      <div className="component-container p-4">
        <div className="center-panel">
          <Row>
              <Col className="col-xs-12 col-sm-12 col-md-12 p-3">
                <Card className="shadow">
                  <iframe
                    src={videoUrl}
                    // width="640"
                    height="400"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowfullscreen
                    frameborder="0"
                    ></iframe>
                    <Card.Body>
                      <h5 className="card-title">
                        <NumberFormat value={data.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        &nbsp;/&nbsp;week
                        <FontAwesomeIcon icon={farHeart} className="text-danger float-right" />
                      </h5>
                      <Card.Text><b>{data.address}</b></Card.Text>
                      <Card.Text><b>owner: {data.owner}</b></Card.Text>
                      <Card.Text className="description" title="{realEstate.description}">
                        <b>
                          <FontAwesomeIcon icon={fasBed} />
                          <span>&nbsp;{data.bedrooms}&nbsp;</span>
                          <FontAwesomeIcon icon={fasBath} />
                          <span>&nbsp;{data.bathrooms}&nbsp;</span>
                          <FontAwesomeIcon icon={fasCar} />
                          <span>&nbsp;{data.cars}&nbsp;</span>
                        </b>
                      </Card.Text>
                    </Card.Body>
                </Card>
              </Col>
            </Row>
        </div>
      </div>
    </Layout>
  );
};

export default PlayVideo;

