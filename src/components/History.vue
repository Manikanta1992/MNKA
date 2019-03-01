<template>
	<div id="main-wrapper">
    <div class="page-wrapper" style="padding:0px;">
      <div class="row m-t-5 m-b-5" style="font-size:16px;">
        <div class="col-lg-12 col-md-12 text-center">
          <select v-model="selected_episode_id" v-on:change="episode_selected">
            <option disabled value="">Please select one</option>
            <option v-for="episode in episodes" v-bind:value="episode.id">{{episode.episode_slot_date}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-5 col-md-5 col-sm-5">
        </div>
        <div class="col-lg-5 col-md-5 col-sm-5">
          <span style="font-size:12px;"><strong>Episode: {{episode}} &nbsp;&nbsp;{{episode_date}}, {{episode_start_time}}-{{episode_end_time}} </strong></span>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2">
          <!-- <span style="font-size:16px;"><strong id="onlineusers">Online: {{online}}</strong></span> -->
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <h6 class="text-center">Play Board</h6>
          <div class="row" style="background-color:black;">
            <div v-for="sequence in callout_sequence" class="btn-sm btn-circle text-center" v-bind:style="getstyle(sequence)">
              {{sequence.char}}
            </div>
          </div><br>
          <div class="row">
            <div v-for="order in callout_order" class="text-center" style="width:5.55%;border:1px solid gray;background-color:#000;color:#fff;">{{order}}</div>
          </div>
        </div>
        <div class="col-lg-8 col-md-8">
          <h6 class="text-center">Winners</h6>
          <div class="row">
            <table class="color-table dark-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>Mobile</th>
                  <th>Ticket Sequence</th>
                  <th>Winning Sequence</th>
                  <th>Winning Category</th>
                  <th>Submitted On</th>
                  <th>Approved At</th>
                  <!-- <th>Payment</th> -->
                </tr>
              </thead>
              <tbody id="rowShift" style="max-height:130px;">
                <tr v-for="winner in winners">
                  <td>{{winner.name}}</td>
                  <td>{{winner.current_city}}</td>
                  <td>{{winner.mobile}}</td>
                  <td>{{winner.ticket_sequence}}</td>
                  <td>{{winner.winning_sequence}}</td>
                  <td>{{winner.winning_categary}}</td>
                  <td>{{winner.submission_time.split(" ")[0]}} {{winner.submission_time.split(" ")[1]}}</td>
                  <td>{{winner.approved_time}}</td>
                  <!-- <td>
                    <div class="button-box">
                      <button type="button" class="btn btn-info btn-xs" style="margin-left:15px;">Pay</button>
                    </div>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- <div class="col-lg-3 col-md-3">
          <h6 class="text-center">Payment</h6>
          <div class="row">
            <div class="col-lg-3">
              <label>Mobile No:</label>
            </div>
            <div class="col-lg-9">
              <div class="input-group">
                <input type="text">
                <div class="input-group-addon"><i class="fa fa-mobile" style="font-size:15px;"></i></div>
              </div>
            </div>
          </div>
          <div class="row m-t-10">
            <div class="col-lg-3">
              <label>Amount:</label>
            </div>
            <div class="col-lg-9">
              <div class="input-group">
                <input type="text">
                <div class="input-group-addon"><i class="fa fa-dollar" style="font-size:15px;"></i></div>
              </div>
            </div>
          </div>
          <div class="row m-t-10">
            <div class="col-lg-3">
              <label>Remarks:</label>
            </div>
            <div class="col-lg-9">
              <div class="input-group">
                <input type="text">
                <div class="input-group-addon"><i class="fa fa-edit" style="font-size:9px;"></i></div>
              </div>
            </div>
          </div>
          <div class="row m-t-10 m-l-20">
            <div class="col-lg-12 text-center">
              <button type="submit" class="btn btn-success btn-xs waves-effect waves-light">Pay Now</button>
              <button type="submit" class="btn btn-inverse btn-xs waves-effect waves-light ">Cancel</button>
            </div>
          </div>
          <div class="row m-t-10 m-l-30">
            <div class="col-lg-12 text-center">
              <img src="../../static/images/paytm.png">
            </div>
          </div>
        </div> -->
      </div>-l
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 m-t-10">
          <h6 class="text-center"><strong style="color:#eda71c;">Claims</strong></h6>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <h6 class="text-center">All 4 Numbers</h6>
          <table class="color-table warning-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Mobile</th>
                <th>Winning Sequence</th>
                <th>Submitted on</th>
                <!-- <th>Action</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in claims[0]['All 4 Numbers']">
                  <td>{{record.name}}</td>
                  <td>{{record.current_city}}</td>
                  <td>{{record.mobile}}</td>
                  <td>{{record.winning_sequence}}</td>
                  <td>{{record.submission_time.split(" ")[0]}} {{record.submission_time.split(" ")[1]}}</td>
                  <!-- <td><i class="fa fa-check-circle" style="font-size:18px;color:#4fd5d9;" v-on:click="addWinner(record)"></i><i class="fa fa-times-circle" style="font-size:18px;color:#D9534F" v-on:click="claims[0]['All 4 Numbers'].splice(claims[0]['All 4 Numbers'].indexOf(record),1)"></i></td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
           <h6 class="text-center">All 5 Alphabets</h6>
           <table class=" color-table warning-table" >
             <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Mobile</th>
                <th>Winning Sequence</th>
                <th>Submitted on</th>
               <!-- <th>Action</th> -->
              </tr>
             </thead>
             <tbody>
               <tr v-for="record in claims[1]['All 5 Alphabets']">
                 <td>{{record.name}}</td>
                 <td>{{record.current_city}}</td>
                 <td>{{record.mobile}}</td>
                 <td>{{record.winning_sequence}}</td>
                 <td>{{record.submission_time.split(" ")[0]}} {{record.submission_time.split(" ")[1]}}</td>
                 <!-- <td><i class="fa fa-check-circle" style="font-size:18px;color:#4fd5d9;" v-on:click="addWinner(record)"></i><i class="fa fa-times-circle" style="font-size:18px;color:#D9534F" v-on:click="claims[1]['All 5 Alphabets'].splice(claims[1]['All 5 Alphabets'].indexOf(record),1)"></i></td> -->
               </tr>
            </tbody>
           </table>
        </div><br><br>
        <div class="col-lg-6 col-md-6 col-sm-12">
           <h6 class="text-center">Super 6</h6>
           <table class="color-table warning-table" >
             <thead>
               <tr>
                 <th>Name</th>
                 <th>City</th>
                 <th>Mobile</th>
                 <th>Winning Sequence</th>
                 <th>Submitted on</th>
                 <!-- <th>Action</th> -->
              </tr>
             </thead>
             <tbody>
               <tr v-for="record in claims[2]['Super 6']">
                 <td>{{record.name}}</td>
                 <td>{{record.current_city}}</td>
                 <td>{{record.mobile}}</td>
                 <td>{{record.winning_sequence}}</td>
                 <td>{{record.submission_time.split(" ")[0]}} {{record.submission_time.split(" ")[1]}}</td>
                 <!-- <td><i class="fa fa-check-circle" style="font-size:18px;color:#4fd5d9;" v-on:click="addWinner(record)"></i><i class="fa fa-times-circle" style="font-size:18px;color:#D9534F" v-on:click="claims[2]['Super 6'].splice(claims[2]['Super 6'].indexOf(record),1)"></i></td> -->
               </tr>
              </tbody>
           </table>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
           <h6 class="text-center">Special 7</h6>
           <table class="color-table warning-table" >
             <thead>
               <tr>
                 <th>Name</th>
                 <th>City</th>
                 <th>Mobile</th>
                 <th>Winning Sequence</th>
                 <th>Submitted on</th>
                 <!-- <th>Action</th> -->
              </tr>
             </thead>
             <tbody>
               <tr v-for="record in claims[3]['Special 7']">
                 <td>{{record.name}}</td>
                 <td>{{record.current_city}}</td> 
                 <td>{{record.mobile}}</td>
                 <td>{{record.winning_sequence}}</td>
                 <td>{{record.submission_time.split(" ")[0]}} {{record.submission_time.split(" ")[1]}}</td>
                 <!-- <td><i class="fa fa-check-circle" style="font-size:18px;color:#4fd5d9;" v-on:click="addWinner(record)"></i><i class="fa fa-times-circle" style="font-size:18px;color:#D9534F" v-on:click="claims[3]['Special 7'].splice(claims[3]['Special 7'].indexOf(record),1)"></i></td> -->
               </tr>
             </tbody>
           </table>
        </div><br><br>
        <div class="col-lg-6 col-md-6 col-sm-12">
           <h6 class="text-center">Musicola</h6>
           <table class="color-table warning-table" >
            <thead>
               <tr>
                 <th>Name</th>
                 <th>City</th>
                 <th>Mobile</th>
                 <th>Winning Sequence</th>
                 <th>Submitted on</th>
                 <!-- <th>Action</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in claims[4]['Musicola']">
                <td>{{record.name}}</td>
                <td>{{record.current_city}}</td> 
                <td>{{record.mobile}}</td>
                <td>{{record.winning_sequence}}</td>
                <td>{{record.submission_time.split(" ")[0]}} {{record.submission_time.split(" ")[1]}}</td>
                <!-- <td><i class="fa fa-check-circle" style="font-size:18px;color:#4fd5d9;" v-on:click="addWinner(record)"></i><i class="fa fa-times-circle" style="font-size:18px;color:#D9534F" v-on:click="claims[4]['Musicola'].splice(claims[4]['Musicola'].indexOf(record),1)"></i></td> -->
              </tr>
            </tbody>
           </table>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { authHeader } from '../_helpers';
import { userService } from '../_services';
import  config from '../../config';
  export default {
    name: 'History',
    data (){
      return {
        selected_episode_id:"",
        episodes:[],
        // baseURL:"http://ec2-18-223-72-143.us-east-2.compute.amazonaws.com",
        episode:"",
        episode_date:"",
        episode_start_time:"",
        episode_end_time:"",
        callout_sequence:[{char:"A",status:false},{char:"B",status:false},{char:"C",status:false},{char:"D",status:false},{char:"E",status:false},{char:"F",status:false},{char:"G",status:false},{char:"H",status:false},{char:"I",status:false},{char:"J",status:false},{char:"K",status:false},{char:"L",status:false},{char:"M",status:false},{char:"N",status:false},{char:"O",status:false},{char:"P",status:false},{char:"Q",status:false},{char:"R",status:false},{char:"S",status:false},{char:"T",status:false},{char:"U",status:false},{char:"V",status:false},{char:"W",status:false},{char:"X",status:false},{char:"Y",status:false},{char:"Z",status:false},{char:"0",status:false},{char:"1",status:false},{char:"2",status:false},{char:"3",status:false},{char:"4",status:false},{char:"5",status:false},{char:"6",status:false},{char:"7",status:false},{char:"8",status:false},{char:"9",status:false}],
        callout_order:[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
        claims:[{"All 4 Numbers":[]},{"All 5 Alphabets":[]},{"Super 6":[]},{"Special 7":[]},{"Musicola":[]}],
        winners:[]
      }
    },
    created:function(){
      const requestOptions = {
        headers: authHeader()
       };
       this.$http.get(`${config.apiUrl}/api/v1/dashboard/episode_history`, requestOptions).then(response => {
        var data = response.body;
        if (data.status) {
          this.episodes = data.episode_history;
        }else{
          if (data.is_auth_error){
            userService.logout();
            location.reload(true);
          }
        }
      });
    },
    methods: {
      getstyle:function(value){
        var bcolor = "#2f3033";
        var odd = ["A","C","E","G","I","K","M","O","Q","S","U","W","Y"]
        if (isNaN(value.char)) {
          if (odd.includes(value.char)) {
            if (value.status) {
              bcolor = "#ff9300";
            }
            return {
              width: "11.11%",
              background:bcolor,
              color:"#fff"
            }
          }else{
            if (value.status) {
              bcolor = "#0076ba";
            }
            return {
              width: "11.11%",
              background:bcolor,
              color:"#fff"
            }
          }
        }else{
          if (value.status) {
            bcolor = "#cb297b";
          }
          return {
            width: "11.11%",
            background:bcolor,
            color:"#fff"
          }
        }
      },
      episode_selected:function(){
        const requestOptions = {
          headers: authHeader()
         };
        this.$http.post(`${config.apiUrl}/api/v1/dashboard/episode_history_data`, {episode_store_id:this.selected_episode_id}, requestOptions).then(response => {
          var data = response.body;
            if (data.status) {
              this.updateEpisode(data);
            }else{
              if (data.is_auth_error){
                userService.logout();
                location.reload(true);
              }
            }
        }, error => {
        });
      },
      updateEpisode: function(data){
        this.episode = data.latest_episode_details.id;
        this.episode_date = data.episode_new_date;
        this.episode_start_time = data.latest_episode_details.episode_slot_time;
        this.episode_end_time = data.latest_episode_details.episode_slot_end_time;
        this.claims[0]["All 4 Numbers"] = data["All 4 Numbers"];
        this.claims[1]["All 5 Alphabets"] = data["All 5 Alphabets"];
        this.claims[2]["Super 6"] = data["Super 6"];
        this.claims[3]["Special 7"] = data["Special 7"];
        this.claims[4]["Musicola"] = data["Musicola"];
        this.winners = data.winners;
        this.callout_order.forEach(function(obj,index){
          this.callout_order[index] = " ";
        }.bind(this));
        if (data.latest_episode_details.call_out_sequence != null) {
          var callout = data.latest_episode_details.call_out_sequence.split('');
          this.callout_sequence.forEach(function(obj1,index1){
            obj1.status = false;
            callout.forEach(function(obj2,index2){
              if (obj1.char === obj2) {
                obj1.status = true;
              }
            });
          });
          callout.forEach(function(obj,index){
            this.callout_order[this.callout_order.indexOf(" ")] = obj;
          }.bind(this));
        }else {
          this.callout_sequence.forEach(function(obj1,index1){
              obj1.status = false;
            });
        }
      }
    },

};

</script>
<style scoped>
          .row {
          margin: 0px;
        }
        table{
          margin: 1px;
        }

        tbody {
          display: block;
          max-height: 180px;
          max-width: 100%;
          overflow-y: auto;
        }

        thead,
        tbody tr {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        td {
          padding: 5px;
          text-align: center;
        }
        .btn-circle.btn-sm {
          height: 30px;
          width: 30px;
        }

        .form-control {
          height: 2px;
        }
        th{
          text-align: center;
        } 
</style>