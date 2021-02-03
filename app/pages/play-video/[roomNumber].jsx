import { useRouter } from 'next/router'
import React from "react";
import Layout from "../../components/Layout";
import {Row, Col} from 'react-bootstrap'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { faHome as fasHome, faBed as fasBed, faBath as fasBath, faCar as fasCar } from '@fortawesome/free-solid-svg-icons';
import { faUpload as fasUpload, faPlay as fasPlay, faDownload as fasDownload } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { default as NumberFormat } from 'react-number-format';
import useSWR from 'swr'
import useUser from "../../lib/useUser";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const fetcher = (url) => fetch(url).then((r) => r.json());

const PlayVideo = () => {
  const { user, mutateUser } = useUser();
  const router = useRouter()
  const { roomNumber } = router.query;

  const { data, error } = useSWR('/api/rooms', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const uploadMediaClick = (roomNumber) => {

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
  
    myWidget.update({tags: ['room-' + roomNumber]});
    myWidget.open();
  }
  
  return (
    <Layout>
      <div className="component-container p-4">
        <div className="center-panel">
          <Row>
              <Col className="col-xs-12 col-sm-12 col-md-12 p-3">
                <Card className="shadow">
                  <Card.Body>
                    <iframe
                      src="https://player.cloudinary.com/embed/?cloud_name=dthv50qgh&public_id=wzrcoqodtjns4ha1kgxi&fluid=true&controls=true&source_types%5B0%5D=mp4"
                      width="640"
                      height="400"
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                      allowfullscreen
                      frameborder="0"
                      ></iframe>
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

