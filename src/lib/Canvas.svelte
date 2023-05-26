<!-- DOESNT WORK YET -->

<script lang="ts">
	import { T, useThrelte } from '@threlte/core'
	import { Environment, Float, HTML } from '@threlte/extras'
	import { spring } from 'svelte/motion'
	import { derived } from 'svelte/store'
	import type { Mesh as ThreeMesh } from 'three'
	import { Color, MeshStandardMaterial } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

	//  const { pointer } = useThrelte()

	const offsetX = spring(0)
	$: offsetX.set(0)
	const offsetY = spring(0)
	$: offsetY.set(0)

	const url = window.origin
</script>

<Environment path="/hdr/" files="shanghai_riverside_1k.hdr" />

<T.PerspectiveCamera position={{ z: 0, x: 50, y: 0 }} fov={20} rotation={{ x: 0, y: 0, z: 0 }} lookAt={{ x: 0, y: 0, z: 0 }} />

<T.AmbientLight intensity={0.3} />

<Float scale={0.7}>
	<HTML rotation={{ y: DEG2RAD * 90 }} position={{ x: 1.2 }} transform>
	  <div class="phone-wrapper">
		<iframe title="" src={url} width="100%" height="100%" frameborder="0" />
	  </div>
	</HTML>
	  <T.Mesh scale={5.65}>
		<T.BoxGeometry args={[1, 2, 1]} />
		<T.MeshBasicMaterial color="hotpink" />
	  </T.Mesh>
  </Float>
  
  <style>
	.phone-wrapper {
	  height: 848px;
	  width: 420px;
	  border-radius: 63px;
	  overflow: hidden;
	  border: 1px solid rgba(0, 0, 0, 0.1);
	}
  </style>
  