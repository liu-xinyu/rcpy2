<template name="component-name">
    <div>
        showzgtoadmin
    </div>
</template>
<script>
export default {
   data(){
       return{

       }
   },
   methods:{
       async getList(){
        //    const res=await this.axios.get('rcpy/zyzgServlet?operation=ListZyzgtoadmin',{
        //        params:{
        //            pageSize: 10,//分页大小
        //        }
        //    });
        //    console.log(res);
       }
   },
   created(){
       this.getList()
   }
}
</script>

<style>

</style>