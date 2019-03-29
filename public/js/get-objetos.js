	/*$.ajax({
			url:"https://localhost:3000/objeto",
			data: JSON.stringify({
				"nome": nome,
				"tagRFID": tagRFID,
				"tombo": tombo,
				"descricao": descricao,
				"sala":sala
			}),
			type: "get",
			contentType: "application/json"
			success: function(data){
				console.log(data)
			},
			error: function(xhr, status, err){
				console.log(err)
			}

		})*/

function getObjetos(){
			$.ajax({url:"http://localhost:3000/objetos"
		}).done(function(data){
			var output = '<h2>Lista de Objetos</h2>';
				output +=  '<table>';
				output += '<tr>';
				output += '<td><b>'+'Nome'+'</b></td>';
				output += '<td><b>'+'Tag RFID'+'</b></td>';
				output += '<td><b>'+'Descricao'+'</b></td>';
				output += '<td><b>'+'Tombo'+'</b></td>';
				output += '<td><b>'+'Sala'+'</b></td>';
				output += '<td></b></td>';
				output += '</tr>';
			$.each(data, function(key, data){
				output += '<tr>';
				output += '<td>'+data.nome+'</td>';
				output += '<td>'+data.tagRFID+'</td>';
				output += '<td>'+data.descricao+'</td>';
				output += '<td>'+data.tombo+'</td>';
				output += '<td>'+data.sala+'</td>';
				output += '<td><a href="/editar/'+data._id+'">Editar</a></td>';
				output += '</tr>';
			});
			output += '</table>';
			$('#objetos').html(output);
		});
	}