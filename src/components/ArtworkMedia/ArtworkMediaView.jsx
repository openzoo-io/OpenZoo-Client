import SuspenseImg from 'components/SuspenseImg';
import React, { Suspense } from 'react';
import ReactPlayer from 'react-player';
import Loader from 'components/Loader';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stage, Center, useGLTF } from '@react-three/drei';

export function ArtworkMediaView(props) {
  const { image, className } = props;

  const styles = useStyle();
  const ext = image ? image.split('.').pop() : '';


  if (['mp4', 'mp3'].indexOf(ext) != -1) {
    return (
      <div className="player-wrapper">
        <ReactPlayer
          className={`${cx(styles.mediaInner, className)} react-player`}
          loop={true}
          url={image}
          controls={true}
          width="100%"
          height="100%"
        />
      </div>
    );
  } else if (['glb'].indexOf(ext) != -1) {
    const { scene } = useGLTF(image);

      return (
        <Canvas camera={{ fov: 50, near: 0.1, far: 2000 }}>
          <Center alignTop={false}>
            <Stage>
              <Suspense fallback={null}>
                <primitive object={scene} />
              </Suspense>
            </Stage>
          </Center>
          <OrbitControls autoRotate={true} />
        </Canvas>
      );
  } else {
    return (
      <Suspense
        fallback={<Loader type="Oval" color="#00A59A" height={32} width={32} />}
      >
        <SuspenseImg className={cx(styles.mediaInner, className)} src={image} />
      </Suspense>
    );
  }
}

const useStyle = makeStyles(() => ({
  mediaInner: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    borderRadius: '4px',
  },
}));
