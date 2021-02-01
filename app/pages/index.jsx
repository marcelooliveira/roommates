import React from "react";
import Layout from "../components/Layout";
import {Row, Col} from 'react-bootstrap'
import Card from "react-bootstrap/Card";
import { faHome as fasHome, faBed as fasBed, faBath as fasBath, faCar as fasCar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { default as NumberFormat } from 'react-number-format';
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json());

const Home = () => {
  const { data, error } = useSWR('/api/rooms', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <div className="component-container p-4">
        <div className="center-panel">
          <Row>
            {data.map((room) => (
              <Col key={room.number} id="hits" className="col-xs-12 col-sm-6 col-md-4 p-3">
                <Card className="shadow">
                  <img src={room.pic} className="card-img-top img-estate" />
                  <Card.Body>
                    <h5 className="card-title">
                      <NumberFormat value={room.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                      <FontAwesomeIcon icon={farHeart} className="text-danger float-right" />
                    </h5>
                    <Card.Text><h6>{room.address}</h6></Card.Text>
                    <Card.Text className="description" title="{realEstate.description}">
                      <h6>
                        <FontAwesomeIcon icon={fasBed} />
                        <span>&nbsp;{room.bedrooms}&nbsp;</span>
                        <FontAwesomeIcon icon={fasBath} />
                        <span>&nbsp;{room.bathrooms}&nbsp;</span>
                        <FontAwesomeIcon icon={fasCar} />
                        <span>&nbsp;{room.cars}&nbsp;</span>
                      </h6>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
