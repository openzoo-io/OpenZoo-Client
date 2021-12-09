import SuspenseImg from 'components/SuspenseImg';
import React, { Suspense, useMemo } from 'react';
import ReactPlayer from 'react-player';
import Loader from 'components/Loader';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Canvas,useLoader } from '@react-three/fiber';
import { OrbitControls, Stage,useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


function Model({ url }) {
  const { scene, animations } = useLoader(GLTFLoader, url)

  
  const copiedScene = useMemo(() => {
    return scene.clone();
  }, [scene]);

  const { names, actions } = useAnimations(animations, scene);
  if (names[0])
  actions[names[0]].play()
 

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
    //const { scene } = useGLTF(image);

    return (
      <div style={{ maxHeight: 676, height: '100%',minHeight:320 }}>
        <Canvas camera={{ fov: 50, near: 0.01, far: 2000 }}>
          <Suspense fallback={null}>
            <Stage intensity={0.5} preset="upfront">
              <Model url={image} />
            </Stage>
          </Suspense>

          <OrbitControls makeDefault  autoRotate={true}/>
        </Canvas>
      </div>
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
