<template>
<div id="shipment">

  <b-card title="Mange Shiping" sub-title="Double click in name text for edit">
  <!-- table  -->
  <div class="form-group">
  <label>Search by Id</label>
  <input v-model="query" type="text" class="form-control" placeholder="Search By ID(e.g. S1009)"></input>
  </div>
    <div class="table-responsive mt-3">
        <table class="table table-hover table-bordered table-striped">
            <thead>
                <tr>
                <th class="text-primary" @click="sortData('id')" scope="col">Order ID</th>
                <th class="text-primary" @click="sortData('name')" scope="col">Name</th>
                <th class="text-primary" @click="sortData('mode')" scope="col">Mode</th>
                <th class="text-primary" @click="sortData('type')" scope="col">Type</th>
                <th class="text-primary" @click="sortData('total')" scope="col">Total</th>
                <th class="text-primary">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in shipments" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td @dblclick="editName(order.id)">{{ order.name }}</td>
                    <td>{{ order.mode }}</td>
                    <td>{{ order.type }}</td>
                    <td>{{ order.total }}</td>
                    <td><button @click="showDetails(order.id)" class="btn btn-info btn-sm">view</button></td>
                </tr>
                
            </tbody>
            </table>
        
            
          <paginate v-show="totalData > 20" :totalPages="totalPages"
          :totalData="totalData"></paginate>
            
    </div>

    <!-- end table -->

    <!-- start modal -->
    <b-modal ref="my-modal" hide-footer title="Update">
        
        <b-form  @submit.prevent="updateName">
                <b-form-group
                    id="input-group-1"
                    label="Name:"
                    label-for="input-1"
                >
                    <b-form-input
                    id="input-1"
                    v-model="details.name"
                    type="text"
                    required
                    placeholder="Name"
                    ></b-form-input>
                </b-form-group>


                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>

       </b-modal>
    <!-- end modal -->

   

  </b-card>

  
</div>
</template>

<script>
import paginate from './partial/Paginate'
import ShipmentView from './ShipmentView'
export default {
  components: { paginate,ShipmentView },
  name: 'Shipments',
  data () {
    return {
      query : '',
      orderBy: '',
      shipments : [],
      totalData : 0,
      totalPages : 0,
      limit : 20,
      currentPage : 1,
      details : {
        id : '',
        name : '',
      },
       
    }
  },
 
  mounted() {
    
      this.axios.get(this.$baseUrl+'/shipments')
      .then(res=>{
        this.totalData = res.data.length
        console.log(this.totalData)
      })
      .catch(error=>{
        console.log(error)
      })

      this.getData()

  },
  watch:{
    query:function(newQ,old) {
        if(newQ === ''){
            this.getData();
        }else{
            this.searchData();
        }
    }
  },

methods:{
    showModal() {
      this.$refs['my-modal'].show()
    },

    hideModal() {
        this.$refs['my-modal'].hide()
      },
    
    getData(page = 1 , limit = 20){
        this.axios.get(this.$baseUrl+'/shipments?_page=' + page + "&_limit=" + limit)
        .then(res => {
          this.currentPage = page
            this.shipments = res.data
            this.totalPages = Math.ceil(this.totalData / this.limit);
            console.log(this.shipments)
        })
        .catch(error=>{
          console.log(error)
        })
    },

    searchData(){
      this.axios.get(this.$baseUrl+'/shipments?id_like='+this.query.toUpperCase())
        .then(res => {
          console.log(this.query)
            this.shipments = res.data
            this.totalPages = Math.ceil(this.totalData / this.limit);
            console.log(this.shipments)
        })
        .catch(error=>{
          console.log(error)
        })
    },

    sortData(field,page = 1 , limit = 20) {
      if(!this.orderBy){
        this.orderBy = 'asc';
      }else if(this.orderBy == 'asc'){
        this.orderBy = 'desc';
      }else{
        this.orderBy = 'asc';
      }
      // console.log(this.orderBy)
      this.axios.get(this.$baseUrl+'/shipments?_sort='+field+'&_order='+this.orderBy+'&_page=' + this.currentPage + "&_limit=" +limit)
        .then(res => {
            this.shipments = res.data
            this.totalPages = Math.ceil(this.totalData / this.limit);
            console.log(this.shipments)
        })
        .catch(error=>{
          console.log(error)
        })
    },

    showDetails(id){
      this.$router.push({ name: 'ShipmentView', params: { id } })
    },

    editName(id){
      this.showModal()
      this.axios.get(this.$baseUrl+'/shipments?id='+id)
        .then(res=>{
            this.details.id = res.data[0].id
            this.details.name = res.data[0].name
            console.log(res.data[0].name)
        })
        .catch(error=>{
          console.log(error)
        })
    },

    updateName(){
      this.hideModal()
      this.axios.patch(this.$baseUrl+'/shipments/'+this.details.id,{
        name : this.details.name
      })
        .then(res=>{
            console.log(res)
            this.getData()
            this.details.id = ''
            this.details.name = ''
        })
        .catch(error=>{
          console.log(error)
        })
    }
      
  }

}
</script>
<style scoped>
#shipment {
  text-align: center;
}
</style>
