import SuspenseImg from 'components/SuspenseImg';
import React, { Suspense, useMemo } from 'react';
import ReactPlayer from 'react-player';
import Loader from 'components/Loader';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Canvas, useLoader } from '@react-three/fiber';
import {
  OrbitControls,
  Stage,
  useAnimations,
  useProgress,
  Html,Environment

} from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model({ url }) {
  const { scene, animations } = useLoader(GLTFLoader, url);

  const copiedScene = useMemo(() => {
    return scene.clone();
  }, [scene]);

  const { names, actions } = useAnimations(animations, scene);
  if (names[0]) actions[names[0]].play();

  if (copiedScene) {
    return (
      <>
        <primitive object={scene} />
      </>
    );
  } else {
    return <></>;
  }
}

function Loader3D() {
  const { progress } = useProgress();
  return (
    <Html center style={{ color: '#00a59a' }}>
      {progress.toFixed(2)}%
    </Html>
  );
}

function addDefaultSrc(ev) {
  ev.target.src = '/notfound.png';
}

export function ArtworkMediaView(props) {
  const { image, className } = props;

  const styles = useStyle();
  const ext = image ? image.split('.').pop() : '';

  if (['mp4'].indexOf(ext) != -1) {
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
  } else if (['mp3'].indexOf(ext) != -1) {
    return (
      <div className="player-wrapper audio">
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
    //const { scene } = useGLTF(image);

    return (
      <div
        style={{
          maxHeight: 676,
          height: 515,
          boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
          borderRadius: 20,
        }}
      >
        <Canvas camera={{ fov: 50, near: 0.01, far: 2000 }}>
          <Suspense fallback={<Loader3D />}>
            <Stage
              intensity={0.1}
              environment={false}
              contactShadow={{opacity:0.2, blur:4}}
  
            >
          
             <Environment files={'studio.hdr'} path={'/'} preset={null} background={false} />
                <Model url={image} />
             
            </Stage>
          </Suspense>

          <OrbitControls makeDefault autoRotate={true} />
        </Canvas>
      </div>
    );
  } else {
    if (image) {
      return (
        <Suspense fallback={<Loader type="Oval" stroke="#00A59A" size={32} />}>
          <SuspenseImg
            className={cx(styles.mediaInner, className)}
            src={image}
            onError={addDefaultSrc}
          />
        </Suspense>
      );
    } else {
      return <></>;
    }
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
