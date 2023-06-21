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
  //useProgress,
  //Html,
  Environment,
  Loader as Loader3d
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

/*
function Loader3D() {
  const { progress } = useProgress();
  return (
    <Html center style={{ color: '#00a59a' }}>
      {progress.toFixed(2)}%
    </Html>
  );
}
*/

function addDefaultSrc(ev) {
  ev.target.src = '/notfound.png';
}

export function ArtworkMediaView(props) {
  const { image, coverImage, className } = props;

  const styles = useStyle();
  const ext = image ? image.split('.').pop() : '';

  if (['mp4'].indexOf(ext) != -1) {
    return (
      <div className="player-wrapper">
        <ReactPlayer
          className={`${cx(styles.mediaInner, className)} react-player item_vdo`}
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
      <>
        <div className="audio-wrapper">
          {coverImage && (
            <Suspense
              fallback={<Loader type="Oval" stroke="#00A59A" size={32} />}
            >
              <SuspenseImg
                className={cx(styles.mediaInner, className)}
                src={coverImage}
                onError={addDefaultSrc}
              />
            </Suspense>
          )}
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
        </div>
      </>
    );
  } else if (['glb'].indexOf(ext) != -1) {
    //const { scene } = useGLTF(image);

    return (
      <div
        style={{
          maxHeight: 676,
          maxWidth: 676,
          aspectRatio: 1,
          boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
          borderRadius: 20,
        }}
      >
        <Canvas camera={{ fov: 50, near: 0.01, far: 2000 }}>
          <Suspense fallback={null}>
            <Stage
              environment={false}
              contactShadow={{ opacity: 0.2, blur: 4 }}
            >
              <Environment
                files={'sunrise.hdr'}
                path={'/'}
                preset={null}
                background={false}
              />
              <Model url={image} />
            </Stage>
          </Suspense>

          <OrbitControls makeDefault autoRotate={true} />
        </Canvas>
        <Loader3d dataStyles={{color:'#00a59a'}} barStyles={{background:'#00a59a'}} dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`}/>
      </div>
    );
  } else {
    if (image) {
      // Convert from zoo-factory.vercel.app to Zookeeper //
      let image2 = image.replace("zoo-factory.vercel.app","app.zookeeper.finance");
      return (
        <Suspense fallback={<Loader type="Oval" stroke="#00A59A" size={32} />}>
          <SuspenseImg
            className={cx(styles.mediaInner, className)}
            src={image2+'?img-quality=60&img-format=jpeg&img-width=676'}
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
