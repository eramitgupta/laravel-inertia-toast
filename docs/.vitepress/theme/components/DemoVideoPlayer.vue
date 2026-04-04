<script setup lang="ts">
import { withBase } from 'vitepress';

const poster = withBase('/demo/toast-demo-poster.jpg');
const source = withBase('/demo/toast-demo.webm');
</script>

<template>
    <div class="demo-video-card">
        <video
            class="demo-video"
            autoplay
            controls
            loop
            muted
            preload="metadata"
            playsinline
            :poster="poster"
        >
            <source :src="source" type="video/webm" />
            Your browser does not support the demo video.
        </video>
    </div>
</template>
