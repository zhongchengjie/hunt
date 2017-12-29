<template>
    <div>
        <img :src="'https://steamcommunity-a.akamaihd.net/economy/image/'+infoObj.asset_icon_url">
    </div>
</template>

<script>
export default {
	  name:"assetInfo",
	  props:["infoObj"]
}
</script>





