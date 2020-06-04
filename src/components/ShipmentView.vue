<template>
  <div class="card border-secondary mb-3">
  <div class="card-header">Showing Details for {{details.name}}</div>
  <div class="card-body text-secondary">
  
    <div class="card">
      <div class="card-body">
        <strong>Shipment Id : </strong> {{details.id}}
      </div>
    </div>
      
    <div class="card">
      <div class="card-body">
        <strong>Name : </strong> {{details.name}}
      </div>
    </div>

    <div class="mt-3">
    <div class="card">
      <div class="card-body">
          <strong>cargo : </strong>

          <div v-for="cargo in details.cargo" class="card mt-3" style="width: 18rem;">
            <ul v-for="(value, key) in cargo" class="list-group list-group-flush">
              <li class="list-group-item"><strong>{{ key }} : </strong>{{value}}</li>
            </ul>
          </div>
      </div>
    </div>
      
    </div>

    <div class="card">
      <div class="card-body">
      <strong>Mode : </strong> {{details.mode}}
      </div>
    </div>
    <div class="card">
      <div class="card-body">
      <strong>Type : </strong> {{details.type}}
      </div>
    </div>
    <div class="card">
      <div class="card-body">
      <strong>Destination : </strong> {{details.destination}}
      </div>
    </div>
    <div class="card">
      <div class="card-body">
      <strong>Origin : </strong> {{details.origin}}
      </div>
    </div>

    <div class="mt-3">
    <div class="card">
      <div class="card-body">
      <strong>services : </strong>
          <div v-for="(services, index) in details.services" class="card mt-3" style="width: 18rem;">
            <ul v-for="(value, key) in services" class="list-group list-group-flush">
              <li class="list-group-item"><strong>{{ key }} : </strong>{{value}}</li>
            </ul>
          </div>
      </div>
    </div>
      
    </div>

    <div class="card">
      <div class="card-body">
      <strong>Total : </strong> {{details.total}}
      </div>
    </div>
    <div class="card">
      <div class="card-body">
      <strong>Status : </strong> {{details.status}}
      </div>
    </div>
    <div class="card">
      <div class="card-body">
      <strong>userId : </strong> {{details.userId}}
      </div>
    </div>


   
   

</div>
</div>
</template>

<script>
export default {
  name: 'ShipmentView',
  data () {
    return {
      id : this.$route.params.id,
      details : {},
    }
  },
  mounted() {
    this.getDetails()
  },
  methods: {
      getDetails(){
        this.axios.get(this.$baseUrl+'/shipments?id='+this.id)
        .then(res=>{
            this.details = res.data[0]
            console.log(this.details)
        })
      }
  },
}
</script>
