

(function(globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    var v=(n > 1);
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  /* gettext library */

  django.catalog = django.catalog || {};
  
  var newcatalog = {
    "%(sentDate)s by %(user)s": "%(sentDate)s por %(user)s", 
    "A newer version of this article has been published since this draft was saved. You can restore the draft to view the content, but you will not be able to submit it for publishing.": "Uma nova vers\u00e3o desse artigo foi publicada desde que esse rascunho foi salvo. Voc\u00ea pode restaurar o rascunho para ver o conte\u00fado, mas n\u00e3o poder\u00e1 submet\u00ea-lo para publica\u00e7\u00e3o.", 
    "Article Title Lookup / Link Text": "Busca do t\u00edtulo do artigo / Texto do link", 
    "Aspect ratio": "Formato da tela", 
    "Attachments": "Anexos", 
    "Autosave enabled.": "Salvar automaticamente habilitado.", 
    "CSS": "CSS", 
    "Changes saved.": "Altera\u00e7\u00f5es salvas.", 
    "Close": "Fechar", 
    "Close notification": "Fechar a notifica\u00e7\u00e3o", 
    "Close submenu": "Fechar o submenu", 
    "Compare this date to the latest revision date to ensure you're not overwriting later changes.": "Compare essa data com a \u00faltima data de revis\u00e3o para garantir que voc\u00ea n\u00e3o est\u00e1 sobrescrevendo mudan\u00e7as mais recentes.", 
    "Create a Redirect": "Criar um redirecionamento", 
    "Default": "Padr\u00e3o", 
    "Details": "Detalhes", 
    "Discard draft.": "Descartar rascunho.", 
    "Document": "Documento", 
    "Draft autosaved:": "Rascunho salvo automaticamente:", 
    "Draft discarded.": "Rascunho descartado.", 
    "Draft discarded:": "Rascunho descartado:", 
    "Draft published:": "Rascunho publicado:", 
    "Draft restored.": "Rascunho restaurado.", 
    "Edit Page": "Editar p\u00e1gina", 
    "Embed YouTube Video": "Integrar v\u00eddeo do YouTube", 
    "Error loading content, please refresh the page": "Erro ao carregar o conte\u00fado, atualize a p\u00e1gina", 
    "Error submitting as %(type)s": "Erro ao enviar como %(type)s", 
    "HTML": "HTML", 
    "Hang on! Updating filters\u2026": "Espere! Atualizando filtros\u2026", 
    "History": "Hist\u00f3rico", 
    "Insert Code Sample Template": "Inserir template de exemplo de c\u00f3digo", 
    "Insert Code Sample iFrame": "Inserir um exemplo de c\u00f3digo iFrame", 
    "JavaScript": "JavaScript", 
    "Launch": "Iniciar", 
    "Locate a YouTube Video": "Localizar um v\u00eddeo do YouTube", 
    "MDN Redirect": "Redirecionamento MDN", 
    "More about the beta.": "Mais sobre o beta.", 
    "Never": "Nunca", 
    "New compatibility tables are in beta ": "As novas tabelas de compatibilidade est\u00e3o em beta\u00a0", 
    "New interest...": "Novo interesse...", 
    "New tag...": "Nova etiqueta...", 
    "No": "N\u00e3o", 
    "No Highlight": "Sem destaque", 
    "No attachments available": "Sem anexos dispon\u00edveis", 
    "No selection": "Nada selecionado", 
    "Open": "Abrir", 
    "Open implementation notes": "Abrir notas de implementa\u00e7\u00e3o", 
    "Open in %(site)s": "Abrir em %(site)s", 
    "Paste YouTube Video URL": "Colar URL do v\u00eddeo do YouTube", 
    "Published version": "Vers\u00e3o publicada", 
    "Publishing changes\u2026": "Publicando mudan\u00e7as\u2026", 
    "Publishing failed. Please copy and paste your changes into a safe place and try submitting the form using the \"Publish\" button.": "Erro ao publicar. Por favor copie e cole suas altera\u00e7\u00f5es em um lugar seguro e tente submeter o formul\u00e1rio utilizando o bot\u00e3o \"Publicar.\"", 
    "Publishing failed. You are not currently signed in. Please use a new tab to sign in and try publishing again.": "Erro ao publicar. Voc\u00ea n\u00e3o est\u00e1 logado. Por favor abra uma nova aba para fazer login e tente publicar novamente.", 
    "Report an error.": "Informar um erro.", 
    "Reported. Thanks!": "Informado. Obrigado!", 
    "Restore draft.": "Restaurar rascunho.", 
    "Result": "Resultado", 
    "Return to compatibility table.": "Retornar \u00e0 tabela de compatibilidade.", 
    "Revert": "Reverter", 
    "Revision history.": "Hist\u00f3rico de revis\u00f5es.", 
    "Sample CSS Content": "Exemplo de conte\u00fado CSS", 
    "Sample Finder": "Buscador de amostras", 
    "Sample HTML Content": "Exemplo de conte\u00fado HTML", 
    "Sample JavaScript Content": "Exemplo de conte\u00fado JavaScript", 
    "Search Stack Overflow": "Pesquisar no Stack Overflow", 
    "Sections in Document": "Se\u00e7\u00f5es do documento", 
    "Select a section": "Selecionar uma se\u00e7\u00e3o", 
    "Select an attachment": "Selecionar um anexo", 
    "Selected: ": "Selecionado:\u00a0", 
    "Show old table.": "Mostrar tabela antiga.", 
    "Submitted as %(submissionType)s": "Enviado como %(submissionType)s", 
    "Submitting...": "Enviando...", 
    "Syntax Highlighter": "Destacar sintaxe", 
    "Take the survey": "Responda a pesquisa", 
    "The URL you've entered doesn't appear to be valid": "O URL informada n\u00e3o parece ser v\u00e1lido", 
    "URL": "URL", 
    "Updated filters.": "Filtros atualizados.", 
    "View Page": "Exibir p\u00e1gina", 
    "View draft.": "Exibir rascunho.", 
    "Viewing old draft. This draft cannot be published.": "Visualizando rascunho antigo. Esse rascunho n\u00e3o pode ser publicado.", 
    "What should the sample title be?": "Qual ser\u00e1 o t\u00edtulo do exemplo?", 
    "Would you answer 4 questions for us? <a %(url)s>Open the survey in a new tab</a> and fill it out when you are done on the site. Thanks!": "Voc\u00ea responderia 4 perguntas para n\u00f3s? <a %(url)s>Abra a pesquisa em uma nova aba</a> e preencha quando terminar de navegar no site. Obrigado!", 
    "Yes": "Sim", 
    "You are now viewing this site in %(localeName)s. Do you always want to view this site in %(localeName)s?": "Voc\u00ea est\u00e1 visualizando este site em %(localeName)s. Deseja ver este site em %(localeName)s sempre?", 
    "You have a draft from: %(time)s.": "Voc\u00ea tem um rascunho de: %(time)s.", 
    "You must input a valid YouTube video URL.": "Voc\u00ea deve fornecer um URL v\u00e1lido de um v\u00eddeo do YouTube.", 
    "Your browser does not support MathML. A CSS fallback has been used instead.": "Seu navegador n\u00e3o suporta MathML. Ao inv\u00e9s disso, foi utilizado um recurso CSS.", 
    "an unknown date": "uma data desconhecida"
  };
  for (var key in newcatalog) {
    django.catalog[key] = newcatalog[key];
  }
  

  if (!django.jsi18n_initialized) {
    django.gettext = function(msgid) {
      var value = django.catalog[msgid];
      if (typeof(value) == 'undefined') {
        return msgid;
      } else {
        return (typeof(value) == 'string') ? value : value[0];
      }
    };

    django.ngettext = function(singular, plural, count) {
      var value = django.catalog[singular];
      if (typeof(value) == 'undefined') {
        return (count == 1) ? singular : plural;
      } else {
        return value[django.pluralidx(count)];
      }
    };

    django.gettext_noop = function(msgid) { return msgid; };

    django.pgettext = function(context, msgid) {
      var value = django.gettext(context + '\x04' + msgid);
      if (value.indexOf('\x04') != -1) {
        value = msgid;
      }
      return value;
    };

    django.npgettext = function(context, singular, plural, count) {
      var value = django.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
      if (value.indexOf('\x04') != -1) {
        value = django.ngettext(singular, plural, count);
      }
      return value;
    };

    django.interpolate = function(fmt, obj, named) {
      if (named) {
        return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
      } else {
        return fmt.replace(/%s/g, function(match){return String(obj.shift())});
      }
    };


    /* formatting library */

    django.formats = {
    "DATETIME_FORMAT": "j \\d\\e F \\d\\e Y \u00e0\\s H:i", 
    "DATETIME_INPUT_FORMATS": [
      "%d/%m/%Y %H:%M:%S", 
      "%d/%m/%Y %H:%M:%S.%f", 
      "%d/%m/%Y %H:%M", 
      "%d/%m/%Y", 
      "%d/%m/%y %H:%M:%S", 
      "%d/%m/%y %H:%M:%S.%f", 
      "%d/%m/%y %H:%M", 
      "%d/%m/%y", 
      "%Y-%m-%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M", 
      "%Y-%m-%d"
    ], 
    "DATE_FORMAT": "j \\d\\e F \\d\\e Y", 
    "DATE_INPUT_FORMATS": [
      "%d/%m/%Y", 
      "%d/%m/%y", 
      "%Y-%m-%d"
    ], 
    "DECIMAL_SEPARATOR": ",", 
    "FIRST_DAY_OF_WEEK": "0", 
    "MONTH_DAY_FORMAT": "j \\d\\e F", 
    "NUMBER_GROUPING": "3", 
    "SHORT_DATETIME_FORMAT": "d/m/Y H:i", 
    "SHORT_DATE_FORMAT": "d/m/Y", 
    "THOUSAND_SEPARATOR": ".", 
    "TIME_FORMAT": "H:i", 
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S", 
      "%H:%M:%S.%f", 
      "%H:%M"
    ], 
    "YEAR_MONTH_FORMAT": "F \\d\\e Y"
  };

    django.get_format = function(format_type) {
      var value = django.formats[format_type];
      if (typeof(value) == 'undefined') {
        return format_type;
      } else {
        return value;
      }
    };

    /* add to global namespace */
    globals.pluralidx = django.pluralidx;
    globals.gettext = django.gettext;
    globals.ngettext = django.ngettext;
    globals.gettext_noop = django.gettext_noop;
    globals.pgettext = django.pgettext;
    globals.npgettext = django.npgettext;
    globals.interpolate = django.interpolate;
    globals.get_format = django.get_format;

    django.jsi18n_initialized = true;
  }

}(this));

