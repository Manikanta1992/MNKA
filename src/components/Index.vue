<template>
	<div id="main-wrapper">
    <div class="page-wrapper" style="padding:0px;">
      <div class="row">
        <div class="col-lg-5 col-md-5 col-sm-5">
        </div>
        <div class="col-lg-5 col-md-5 col-sm-5">
          <span style="font-size:12px;"><strong>Episode: {{episode}} &nbsp;&nbsp;{{episode_date}}, {{episode_start_time}}-{{episode_end_time}} </strong></span>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2">
          <span style="font-size:16px;" ><strong >Online: {{online}}</strong></span>
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
        <div class="col-lg-7 col-md-7">
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
                  <!-- <td>{{winner.submission_time.split(" ")[0]}} {{winner.submission_time.split(" ")[1]}}</td> -->
                  <td>{{winner.submission_time}}</td>
                  <td>{{winner.approved_time}}</td>
                  <!-- <td>
                    <div class="button-box">
                      <button type="button" class="btn btn-info btn-xs" style="margin-left:15px;" v-on:click="paynow_mobile=winner.mobile">Pay</button>
                    </div>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-lg-1 col-md-1">
          <h6 class="text-left">Game End</h6>
          <div class="m-t-20">.</div>
          <div class="text-left m-t-40">
            <button type="button" class="btn waves-effect waves-light btn-rounded btn-success" @click="gameEnd">End</button>
          </div>
          <!-- <div class="row m-t-20">
            <div class="col-lg-12"></div>
          </div>
          <div class="row m-t-40">
            <div class="col-lg-12" style="margin-right: 20px;">
              <button type="button" class="btn waves-effect waves-light btn-rounded btn-success">End</button>
            </div>
          </div>  -->

          <!-- <h6 class="text-center">Payment</h6>
          <div class="row">
            <div class="col-lg-3">
              <label>Mobile No:</label>
            </div>
            <div class="col-lg-9">
              <div class="input-group">
                <input type="text" v-model="paynow_mobile">
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
                <input type="text" v-model="paynow_amount">
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
          </div> -->
        </div>
      </div>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in claims[0]['All 4 Numbers']">
                  <td>{{record.name}}</td>
                  <td>{{record.current_city}}</td>
                  <td>{{record.mobile}}</td>
                  <td>{{record.winning_sequence}}</td>
                  <td>{{record.submission_time}}</td>
                  <td><i class="fa fa-check-circle" style="font-size:18px;color:#4fd5d9;" v-on:click="addWinner(record)"></i><i class="fa fa-times-circle" style="font-size:18px;color:#D9534F" v-on:click="claims[0]['All 4 Numbers'].splice(claims[0]['All 4 Numbers'].indexOf(record),1)"></i></td>
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
               <th>Action</th>
              </tr>
             </thead>
             <tbody>
               <tr v-for="record in claims[1]['All 5 Alphabets']">
                 <td>{{record.name}}</td>
                 <td>{{record.current_city}}</td>
                 <td>{{record.mobile}}</td>
                 <td>{{record.winning_sequence}}</td>
                 <td>{{record.submission_time}}</td>
                 <td><i class="fa fa-check-circle" style="font-size:18px;color:#4fd5d9;" v-on:click="addWinner(record)"></i><i class="fa fa-times-circle" style="font-size:18px;color:#D9534F" v-on:click="claims[1]['All 5 Alphabets'].splice(claims[1]['All 5 Alphabets'].indexOf(record),1)"></i></td>
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
                 <th>Action</th>
              </tr>
             </thead>
             <tbody>
               <tr v-for="record in claims[2]['Super 6']">
                 <td>{{record.name}}</td>
                 <td>{{record.current_city}}</td>
                 <td>{{record.mobile}}</td>
                 <td>{{record.winning_sequence}}</td>
                 <td>{{record.submission_time}}</td>
                 <td><i class="fa fa-check-circle" style="font-size:18px;color:#4fd5d9;" v-on:click="addWinner(record)"></i><i class="fa fa-times-circle" style="font-size:18px;color:#D9534F" v-on:click="claims[2]['Super 6'].splice(claims[2]['Super 6'].indexOf(record),1)"></i></td>
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
                 <th>Action</th>
              </tr>
             </thead>
             <tbody>
               <tr v-for="record in claims[3]['Special 7']">
                 <td>{{record.name}}</td>
                 <td>{{record.current_city}}</td>
                 <td>{{record.mobile}}</td>
                 <td>{{record.winning_sequence}}</td>
                 <td>{{record.submission_time}}</td>
                 <td><i class="fa fa-check-circle" style="font-size:18px;color:#4fd5d9;" v-on:click="addWinner(record)"></i><i class="fa fa-times-circle" style="font-size:18px;color:#D9534F" v-on:click="claims[3]['Special 7'].splice(claims[3]['Special 7'].indexOf(record),1)"></i></td>
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
                 <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in claims[4]['Musicola']">
                <td>{{record.name}}</td>
                <td>{{record.current_city}}</td>
                <td>{{record.mobile}}</td>
                <td>{{record.winning_sequence}}</td>
                <td>{{record.submission_time}}</td>
                <td><i class="fa fa-check-circle" style="font-size:18px;color:#4fd5d9;" v-on:click="addWinner(record)"></i><i class="fa fa-times-circle" style="font-size:18px;color:#D9534F" v-on:click="claims[4]['Musicola'].splice(claims[4]['Musicola'].indexOf(record),1)"></i></td>
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
    name: 'Index',
    data (){
      return {
        paynow_mobile:'',
        paynow_amount:0,
        online:0,
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
    sockets: {
      connect: function(){
        var data = this.$socket.emit("user");
     
      },
    },
    created:function(){
       const requestOptions = {
        headers: authHeader()
       };
      this.$http.get(`${config.apiUrl}/api/v1/dashboard/home`, requestOptions).then(response => {
        return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (data.status) {
          this.updateEpisode(data);
        }else{
          if (data.is_auth_error){
            userService.logout();
            location.reload(true);
          }
        }
       });
      });
      var data_new = this.$socket.emit("user");
      this.$socket.on('onlineUsersCount', function (data_new) {
         this.online = data_new.count;
      }.bind(this));
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
      addWinner:function(winner){
        var toggle = confirm("Approve as Winner?");
        if (toggle) {
          var date = new Date();
          winner["approved_time"] = this.getDateTime(date.getFullYear()+ "-" + this.getDateTime((date.getMonth()+1).toString()) + "-" + date.getDate().toString()) + " " + this.getDateTime(date.getHours().toString()) + ":" + this.getDateTime(date.getMinutes().toString()) + ":" + this.getDateTime(date.getSeconds().toString())+":"+this.getDateTime(date.getMilliseconds().toString());

            const requestOptions = {
              headers: authHeader()
             };

            this.$http.post(`${config.apiUrl}/api/v1/dashboard/approve`,winner,requestOptions).then(response => {
              var data = response.body;
              if (data.status) {
                this.winners.push(winner);
                this.claims.forEach(function(obj,index){
                  if (winner.winning_categary == Object.keys(obj)[0]) {
                    obj[Object.keys(obj)[0]].splice(obj[Object.keys(obj)[0]].indexOf(winner),1);
                  }
                });
                this.$socket.emit('disableClaim',{winning_categary:winner.winning_categary,mobile:winner.mobile});
              }else {
                if (data.is_auth_error){
                  userService.logout();
                  location.reload(true);
                };
                if (data.message){
                   window.alert(data.message);
                }
              }
          });
        }
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
        if (data.latest_episode_details.call_out_sequence != null) {
          var callout = data.latest_episode_details.call_out_sequence.split('');
          this.callout_sequence.filter(function(obj1,index1){
            callout.forEach(function(obj2,index2){
              if (obj1.char === obj2) {
                obj1.status = true;
              }
            });
          });
          callout.forEach(function(obj,index){
            this.callout_order[this.callout_order.indexOf(" ")] = obj;
          }.bind(this));
        }
      },
      getDateTime: function (val) {
        if (val.length == 1) {
          val = '0' + val;
        }
        return val;
      },
      gameEnd: function(){
         var winnersList = [];
         if (confirm("Are you sure end the Game?")) {
            if (this.winners !=0) {
              for (var i=0;i<this.winners.length;i++){
                winnersList.push({name:this.winners[i].name,current_city:this.winners[i].current_city,winning_categary:this.winners[i].winning_categary})
              }
              this.$socket.emit("endGame",winnersList);
            }
          }
      }
    },
    mounted(){
      this.$socket.on('onlineUsersCount', function (data) {
         this.online = data.count;

      }.bind(this));
      this.$socket.on('getWrapperText',function(callout){
      this.callout_sequence.forEach(function(obj1,index1){
          if (obj1.char === callout.wrappertext) {
            obj1.status = true;
          }
      });
        this.callout_order[this.callout_order.indexOf(" ")] = callout.wrappertext;
      }.bind(this));

      this.$socket.on('All4Numbers',function(data){
          this.claims[0]["All 4 Numbers"].push(data.claims);
      }.bind(this));
      this.$socket.on('All5Alphabets',function(data){
          this.claims[1]["All 5 Alphabets"].push(data.claims);
      }.bind(this));
      this.$socket.on('Super6',function(data){
          this.claims[2]["Super 6"].push(data.claims);
      }.bind(this));
      this.$socket.on('Special7',function(data){
          this.claims[3]["Special 7"].push(data.claims);
      }.bind(this));
      this.$socket.on('Musicola',function(data){
          this.claims[4]["Musicola"].push(data.claims);
      }.bind(this));
    },
  }
  //   payNow:function(){
    //     this.$http.post(this.baseURL+'/api/v1/start_payment', {mobile_no:this.paynow_mobile,amount:this.paynow_amount}).then(response => {
    //       openPayment(response);
    //     }, error => {
    //     });
    //   },
    //   openPayment: function(response){
    //   var win = window.open("","_blank");
    //   var html = "<html><head><meta http-equiv='Content-Type' content='text/html;charset=ISO-8859-I'><title>Paytm</title></head><body><center><h2>Redirecting to Paytm </h2><br/><h1>Please do not refresh this page...</h1></center>"
    //   html += "<form method='post' action='"+response.body.url+"' name='f1'>"
    //   html += "<input type='hidden' name='MID' value='"+response.body.params_list.MID+"'>"
    //   html += "<input type='hidden' name='CHANNEL_ID' value='"+response.body.params_list.CHANNEL_ID+"'>"
    //   html += "<input type='hidden' name='CUST_ID' value='"+response.body.params_list.CUST_ID+"'>"
    //   html += "<input type='hidden' name='INDUSTRY_TYPE_ID' value='"+response.body.params_list.INDUSTRY_TYPE_ID+"'>"
    //   html += "<input type='hidden' name='MSISDN' value='"+response.body.params_list.MSISDN+"'>"
    //   html += "<input type='hidden' name='ORDER_ID' value='"+response.body.params_list.ORDER_ID+"'>"
    //   html += "<input type='hidden' name='TXN_AMOUNT' value='"+response.body.params_list.TXN_AMOUNT+"'>"
    //   html += "<input type='hidden' name='WEBSITE' value='"+response.body.params_list.WEBSITE+"'>"
    //   html += "<input type='hidden' name='CHECKSUMHASH' value='"+response.body.checksum_hash+"'>"
    //   html += "</form><scrip" + "t>document.f1.submit();</sc" + "ript></body></html>"
    //   win.document.write(html);
    //   win.document.close();
    // },
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